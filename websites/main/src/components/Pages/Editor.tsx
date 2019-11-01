import React, {Component} from 'react';
import {Button, FormControl, Nav} from 'react-bootstrap';
import MonacoEditor from 'react-monaco-editor';
import Loader from 'react-loader-spinner'
import Cookies from 'universal-cookie';
import { Mutation } from '@apollo/react-components';

import ReactResizeDetector from 'react-resize-detector';
import {UPLOAD_BOTS} from '../elements/ApolloQueries';
import Replay from '../elements/Replay';
import Popup from '../views/Popup';
import PopupConfirm from '../views/PopupConfirm';
import PopupSubmitEditor from '../views/PopupSubmitEditor';
import WaitAlert from '../elements/WaitAlert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { programmingLanguages } from '../../utils/constants/programmingLanguages';
import * as H from 'history';

interface MatchParams {
    name: string;
    gameName: string;
}

interface RouteComponentProps<P> {
    match: match<P>;
    location: H.Location;
    history: H.History;
    staticContext?: any;
}

interface match<P> {
    params: P;
    isExact: boolean;
    path: string;
    url: string;
}

interface EditorProps extends RouteComponentProps<MatchParams> {
    location: string;
    gameName: string;
}

interface EditorState {
    botCodes: Array<string>;
    selectedBot: number;
    codeFirstBot: string;
    codeSecondBot:string;
    currentLang: Array<string>;
    currentLog: string;
    currentReplayFileBase64: string;
    generatingGame: boolean;
    gameKey: number;
    gameName: string;
    availableLangs: Array<string>;
    isNoLanguageSetBot: Array<boolean>;
    editorW: string;
    editorH: string;
    lastPlay: Date | null;
    showWaitAlert: boolean;
    showResetAlert: boolean;
    waitRemain: number;
    isCodeChanged: boolean;
    showSubmitPopup: boolean;
    error: string | null;
}

class Editor extends Component<EditorProps,EditorState> {
    timeout;
    private textLog!: React.RefObject<HTMLInputElement> | null;

    constructor(props) {
        super(props);
        this.state = {
            botCodes: ["",""],
            selectedBot: 0,
            availableLangs: [],
            codeFirstBot: '',
            codeSecondBot: '',
            currentLang: ["python3","python3"],
            currentLog: "Press RUN to generate a game.",
            currentReplayFileBase64: "",
            generatingGame: false,
            gameKey: 0,
            gameName: "",
            isNoLanguageSetBot: [true,true],
            editorW: "100%",
            editorH: "100%",
            lastPlay: null,
            showWaitAlert: false,
            showResetAlert: false,
            waitRemain: 0,
            isCodeChanged: false,
            showSubmitPopup: false,
            error: null
        };
        this.textLog = null;
    }

    loadBots() {
        const { match: { params } } = this.props;
        fetch('https://api.github.com/repos/planet-lia/planet-lia/contents/games/'+params.gameName+'/bots/')
            .then(resp => resp.text())
            .then((allLangs) => {
                const jsonLang = JSON.parse(allLangs);
                let arrLang = jsonLang.map(el => el.name);
                this.setState({
                    gameName: params.gameName,
                    availableLangs: arrLang
                });
                return arrLang;
            }).then(e => console.log(e));
    }

    componentDidMount = () => {
        if (this.props.match.params.gameName) this.loadBots();
        window.addEventListener('fullscreenchange', this.scrollToBottom);
        window.addEventListener('webkitfullscreenchange', this.scrollToBottom);
        window.addEventListener('mozfullscreenchange', this.scrollToBottom);
        window.addEventListener('MSFullscreenChange', this.scrollToBottom);


        if(localStorage.editorProgLang) {
            const lang = localStorage.editorProgLang;
            const curLang = [
                ...this.state.currentLang.slice(0, this.state.selectedBot),
                lang,
                ...this.state.currentLang.slice(this.state.selectedBot + 1)
            ];

            const noLangSet = [
                ...this.state.isNoLanguageSetBot.slice(0, this.state.selectedBot),
                lang,
                ...this.state.isNoLanguageSetBot.slice(this.state.selectedBot + 1)
            ];
            this.setState({
                currentLang: curLang,
                isNoLanguageSetBot: noLangSet
            });
            if(localStorage.editorCode) {
                const code = [
                    ...this.state.botCodes.slice(0, this.state.selectedBot),
                    localStorage.editorCode,
                    ...this.state.botCodes.slice(this.state.selectedBot + 1)
                ];
                this.setState({
                    botCodes: code,
                    isCodeChanged: true
                });
            } else {
                this.setLanguage(lang)
            }
        }
    }

    resize() {
        const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        const height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        this.resizePlayer(width,height);
    }

    componentWillUnmount = () => {
        window.removeEventListener('fullscreenchange', this.scrollToBottom);
        window.removeEventListener('webkitfullscreenchange', this.scrollToBottom);
        window.removeEventListener('mozfullscreenchange', this.scrollToBottom);
        window.removeEventListener('MSFullscreenChange', this.scrollToBottom);

        clearTimeout(this.timeout);
    }

    editBotArray(attrib, val) {
        return {[attrib]: [
            ...this.state[attrib].slice(0, this.state.selectedBot),
            val,
            ...this.state[attrib].slice(this.state.selectedBot + 1)
        ]};
    }

    async getDefaultBotCode(lang,api) {
        let bot = api.find(el => el.name === "bot.json");
        const botJson = await fetch(bot.download_url).then(resp => resp.text());
        const fileName = JSON.parse(botJson).mainFile;
        const codeFile = bot.download_url.substring(0, bot.download_url.lastIndexOf("/") + 1) + fileName;
        const code = await fetch(codeFile).then(resp => resp.text());
        const botCodes = this.editBotArray("botCodes", code);
        const isNoLanguageSetBot = this.editBotArray("isNoLanguageSetBot", false);
        const currentLang = this.editBotArray("currentLang", lang);
        this.setState({
                ...currentLang,
                ...botCodes,
                ...isNoLanguageSetBot,
            isCodeChanged: false,
        })
    }

    async setLanguage(lang) {
        fetch('https://api.github.com/repos/planet-lia/planet-lia/contents/games/'+this.state.gameName+'/bots/'+lang)
            .then((resp)=>{
                return resp.text();
            })
            .then( (text) => {
                let api = JSON.parse(text);
                if (api.length) this.getDefaultBotCode(lang,api);
                localStorage.removeItem("editorCode");
                localStorage.setItem("editorProgLang", lang);
            });
    };

    generateGame = () => {
        const { lastPlay, currentLang, isNoLanguageSetBot, codeFirstBot, codeSecondBot } = this.state;
        const currentTime = new Date();
        const delayMiliSec = 15000;

        if(isNoLanguageSetBot[0] || isNoLanguageSetBot[1]) {
            this.setState({
                error: "No language was chosen."
            });
            console.error("No language was chosen.");
            return false;
        }

        if(lastPlay && (+currentTime - +lastPlay) < delayMiliSec){
            this.setState({
                showWaitAlert: true,
                waitRemain: Math.ceil( (delayMiliSec - Number(+currentTime - +lastPlay)) /1000 )
            })
            return;
        }
        // Let the user know that the game is being generated
        this.setState({
            currentReplayFileBase64: "",
            generatingGame: true,
            gameKey: this.state.gameKey + 1,
        });

        return [currentLang, codeFirstBot, codeSecondBot];

        /* Set if tracking is enabled
        const cookies = new Cookies();
        let isTrackingOn = cookies.get('editor-tracking') !== "false";

        console.log(isTrackingOn + "  " + cookies.get('editor-tracking'));

         Generate replay
        const response = await fetch('https://editor.cloud1.liagame.com/generate?tracking=' + isTrackingOn, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                language: currentLang,
                code:     this.state.codeFirstBot
            })});
        const json = await response.json();

        // TODO handle if there is an error!
        let trackingId = json['trackingId'];*/
/*
        // Fetch results
        for (let i = 0; i < 180; i++) {
            const response = await fetch('https://editor.cloud1.liagame.com/results/' + trackingId, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                }});
            const json2 = await response.json();

            // Update current logs
            this.setState({ currentLog: json2['game']['log'] });
            this.scrollToBottom();


            if (json2['game']['finished']) {
                // Display new replay file
                this.setState({
                    currentReplayFileBase64: json2['game']['replay'],
                    generatingGame: false,
                    gameKey: this.state.gameKey + 1,
                    lastPlay: new Date(),
                    waitRemain: 0
                });
                return;
            }

            await this.sleep(500);
        }

        this.setState({
            generatingGame: false,
            error: "Failed to fetch game results in time."
        })
        console.error("Failed to fetch game results in time.")
        */
    };

    sleep = async (ms) => {
        return new Promise(resolve => {this.timeout = setTimeout(resolve, ms)});
    };

    resizePlayer = (width, height) => {
        this.setState({editorW: width, editorH: height});
    };

    scrollToBottom = () => {
        window.scrollTo(0, 0)
    };

    onPopupClose = () => {
        this.setState({
            showWaitAlert: false,
            showResetAlert: false,
            showSubmitPopup: false,
        })
    }

    onChange = (newValue, e) => {
        const botCode = [
            ...this.state.botCodes.slice(0, this.state.selectedBot),
            newValue,
            ...this.state.botCodes.slice(this.state.selectedBot + 1)
        ];
        this.setState({
            botCodes: botCode,
            isCodeChanged: true,
        });
        localStorage.setItem("editorCode", newValue);
    }

    onReset = () => {
        if(this.state.isCodeChanged){
            this.setState({
                showResetAlert: true
            })
        } else {
            this.resetEditor();
        }
    }

    resetEditor = () => {
        const botCodes = this.editBotArray("botCodes", "");
        const currentLang = this.editBotArray("currentLang", "python3");
        const isNoLanguageSetBot = this.editBotArray("isNoLanguageSetBot", true);
        this.setState({
            showResetAlert: false,
                ...botCodes,
                ...currentLang,
            ...isNoLanguageSetBot
        })
        localStorage.removeItem("editorCode");
        localStorage.removeItem("editorProgLang");
    }

    render() {
        const {
            selectedBot,
            codeFirstBot,
            botCodes,
            currentLang,
            currentLog,
            currentReplayFileBase64,
            generatingGame,
            gameKey,
            isNoLanguageSetBot,
            editorW,
            editorH,
            showWaitAlert,
            showResetAlert,
            showSubmitPopup,
            waitRemain
        } = this.state;

        const highlighting = programmingLanguages[currentLang[selectedBot]].highlighting;

        const options = {
            selectOnLineNumbers: true,
            fontSize: 12,
            scrollBeyondLastLine: false,
            minimap: {
                enabled: false
            },
        };

            const supportedLanguages = this.state.availableLangs.map((lang) => {
                return <Button className="custom-btn btn" onClick={() => this.setLanguage(lang)} key={lang} type="button">
                    {lang}
                </Button>
            });

        const handleSelect = eventKey => {
            this.setState({selectedBot: +eventKey});
        };

        const code = botCodes[this.state.selectedBot];
        const { gameName, codeSecondBot } = this.state;
        return (
            <div className="editor-main-cont cont-overflow">
                <div className="cont-fullpage editor-cont-page">
                    <div id="editor-left">
                        <Mutation mutation={UPLOAD_BOTS}>
                            {(onlineEditorSubmit, { data }) => (
                                <div id="editor-cont-ui">
                                    <Nav className="editor-tabs" variant="tabs" defaultActiveKey="#firstBot"
                                         onSelect={handleSelect}>
                                        <Nav.Item className="editor-tab-bot">
                                            <Nav.Link href="#firstBot" eventKey="0">Bot 1</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item className="editor-tab-bot">
                                            <Nav.Link eventKey="1">Bot 2</Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                    <div id="editor-btn-reset" className="editor-cont-uielems">
                                        <Button className="btn-dark custom-btn btn" onClick={() => this.onReset()}
                                                type="button" disabled={isNoLanguageSetBot[selectedBot]}>Reset</Button>
                                    </div>
                                    <div id="editor-btn-submit" className="editor-cont-uielems">
                                        <Button className="btn-green custom-btn btn"
                                                onClick={() => this.setState({showSubmitPopup: true})} type="button"
                                                disabled={isNoLanguageSetBot[selectedBot]}>
                                            <FontAwesomeIcon icon="upload"/>
                                            {" Submit"}
                                        </Button>
                                    </div>
                                    <div id="editor-btn-run" className="editor-cont-uielems">
                                        <Button className="btn-green custom-btn btn" onClick={() => {
                                            const firstCode = btoa(unescape(encodeURIComponent(botCodes[0])));
                                            const secondCode = btoa(unescape(encodeURIComponent(botCodes[1])));
                                            onlineEditorSubmit({
                                                    variables: {
                                                        game: gameName,
                                                        firstBot: currentLang[0],
                                                        firstCode: firstCode,
                                                        secondBot: currentLang[1],
                                                        secondCode: secondCode
                                                    }
                                            });
                                        }}
                                                type="button"
                                                disabled={generatingGame || isNoLanguageSetBot[selectedBot]}>
                                            <FontAwesomeIcon icon="play"/>
                                            {" RUN"}
                                        </Button>
                                    </div>
                                </div>
                                )}
                        </Mutation>
                        <ReactResizeDetector handleWidth handleHeight onResize={this.resizePlayer} />
                                <div id="cont-editor">
                                <MonacoEditor
                                width={editorW}
                                height={editorH}
                                language={highlighting}
                                theme="vs-dark"
                                value={code}
                                options={options}
                                onChange={this.onChange}
                                />
                                {isNoLanguageSetBot[selectedBot]
                                    ? (
                                        <div id="editor-block">
                                            <div id="cont-lang-select" className="text-center">
                                                <p>Choose your desired programming language to start.</p>
                                                {supportedLanguages}
                                                <p className="txt-small">If you want to switch the language later click
                                                    on "Reset" button.</p>
                                            </div>
                                        </div>
                                    )
                                    : null
                                }
                                </div>
                    </div>
                    <div id="editor-right">
                        <div id="editor-notification">
                            {"This is just a demo. For full experience "}
                            <a href="https://docs.liagame.com/getting-started/" target="_blank" rel="noopener noreferrer">download SDK</a>
                            .
                        </div>
                        {/* Key resets the replay; instead of currentReplayFileBase64 do gameID */}
                        <div id="editor-cont-replay" key={gameKey}>
                            <Replay containerId="player" number={ 0 } replayFileBase64={ currentReplayFileBase64 } />
                            {generatingGame &&
                            <div id="editor-loader-overlay">
                                <div className="cont-loader">
                                    <Loader
                                        type="Triangle"
                                        color="#019170"
                                        height="100"
                                        width="100"
                                    />
                                </div>
                            </div>
                            }
                        </div>
                        <div id="editor-cont-log">
                            <FormControl
                                as="textarea"
                                value={currentLog}
                                readOnly
                                className="form-control editor-input"
                            />
                        </div>
                    </div>
                </div>
                <Popup
                    dialogClassName="custom-popup pop-editor-sm pop-text"
                    show={showWaitAlert}
                    onHide={this.onPopupClose}
                    onButtonClick={this.onPopupClose}
                    heading="Please wait"
                    buttonText="OK"
                    center={true}
                >
                    <WaitAlert wait={waitRemain}/>
                </Popup>

                <PopupConfirm
                    dialogClassName="custom-popup pop-editor-sm pop-text"
                    show={showResetAlert}
                    onHide={this.onPopupClose}
                    onButtonClick={this.resetEditor}
                    heading="Warning"
                >
                    <p>If you reset the editor, your changes will be lost.</p>
                </PopupConfirm>

                <PopupSubmitEditor
                    show={showSubmitPopup}
                    onHide={this.onPopupClose}
                    code={codeFirstBot}
                    language={currentLang}
                />
            </div>
        );
    }
}

export default (Editor);