import { gql } from 'apollo-boost';

export const UPLOAD_BOTS = gql`
    type Language {
        language: String!
    }
    mutation onlineEditorSubmit($game: String!, $firstBot: Language!, $firstCode: String!, $secondBot: Language!, $secondCode: String!) {
        onlineEditorSubmit(game: $game,
            bots:[{
                language: $firstBot,
                source: $firstCode
            },
                {
                    language: $secondBot,
                    source: $secondCode
                }
            ]){
            id
        }
    }
`;