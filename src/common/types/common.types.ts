export interface ResponseType<D = [], T = []> {
    error: {
        code: number
        message: string
        errors: D
        status: string
        details: T
    }
}

// {
//     "error": {
//     "code": 400,
//         "message": "API key not valid. Please pass a valid API key.",
//         "errors": [
//         {
//             "message": "API key not valid. Please pass a valid API key.",
//             "domain": "global",
//             "reason": "badRequest"
//         }
//     ],
//         "status": "INVALID_ARGUMENT",
//         "details": [
//         {
//             "@type": "type.googleapis.com/google.rpc.ErrorInfo",
//             "reason": "API_KEY_INVALID",
//             "domain": "googleapis.com",
//             "metadata": {
//                 "service": "books.googleapis.com"
//             }
//         }
//     ]
// }
// }
