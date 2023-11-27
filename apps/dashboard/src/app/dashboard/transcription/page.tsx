'use client';

import { gql, useLazyQuery } from "@apollo/client";
import { v4 as uuidv4 } from 'uuid';

const uploadTranscriptionQuery = gql`
    query createSignedUrl($fileName: String!) {
        createSignedUrl(file_name: $fileName)
    }
`;

const createTranscriptionQuery = gql`
    query createTranscription($fileName: String!) {
        createTranscription(file_name: $fileName)
    }
`;


export default function TranscriptionPage() {
    const [createUploadUrl, { called, loading }] = useLazyQuery(uploadTranscriptionQuery);
    const [createTranscription, {}] = useLazyQuery(createTranscriptionQuery);

    const uploadFile = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const uuid = uuidv4();

        const { data } = await createUploadUrl({
            variables: {
                fileName: uuid
            }
        })

        const formData = new FormData();
        formData.append('file', e.target[0].files[0]);

        await fetch(data.createSignedUrl, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/octet-stream"
            },
            body: formData,
        }).then(res => {
            if (res.ok) {
                console.log(uuid);
                const transcription = createTranscription({
                    variables: {
                        fileName: uuid
                    }
                })
            }
        })
    }
    if (called && loading) return <p>Loading ...</p>
    return (
        <>
            <section className="container mx-auto px-4 py-4">
                <h1 className="text-5xl font-extrabold dark:text-white">Transcription</h1>
                <div className="grid  grid-cols-2">
                    <div className="col-1 container mx-auto px-4 py-4">
                        <form onSubmit={uploadFile}>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload file</label>
                            <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file" />
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">Upload audio files (MP3, WAV) for transcription (Max. 10MB.)</p>

                            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                upload
                            </button>
                        </form>

                        <div>
                        </div>
                    </div>
                    <div className="col-1 container mx-auto px-4 py-4">
                        <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Transcription output</label>
                        <textarea id="message" rows={4} className="block p-2.5 w-full h-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your transcription will be written here"></textarea>
                    </div>
                </div>
            </section >
        </>
    )
}