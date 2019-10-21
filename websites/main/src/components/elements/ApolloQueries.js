import { gql } from 'apollo-boost';

export const UPLOAD_BOTS = gql`
    mutation onlineEditorSubmit($game: String!, $firstBot: String!, $firstCode: String! $secondBot: String!, $secondCode: String!) {
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