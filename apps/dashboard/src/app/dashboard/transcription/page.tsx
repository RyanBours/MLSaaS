'use client';

import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const uploadTranscriptionQuery = gql`
    mutation createSignedUrl($fileName: String!) {
        createSignedUrl(file_name: $fileName)
    }
`;

const createTranscriptionQuery = gql`
    mutation createTranscription($fileName: String!) {
        createTranscription(file_name: $fileName)
    }
`;

const fetchTranscriptionQuery = gql`
    query fetchTranscription($transcriptionId: String!) {
        fetchTranscription(transcription_id: $transcriptionId)
    }
`;


export default function TranscriptionPage() {
    const [uuid, setUuid] = useState('');
    const [createUploadUrl, { called, loading }] = useMutation(uploadTranscriptionQuery);
    const [createTranscription] = useMutation(createTranscriptionQuery);
    const [fetchTranscription, { data: transcription_data, stopPolling }] = useLazyQuery(fetchTranscriptionQuery, { pollInterval: 1000 });

    const [inProgress, setInProgress] = useState(false);

    const uploadFile = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setInProgress(true);

        const uuid = uuidv4();

        setUuid(uuid);

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
                createTranscription({
                    variables: {
                        fileName: uuid
                    }
                })
                fetchTranscription({
                    variables: {
                        transcriptionId: uuid
                    }
                })
            }
        })
    }

    useEffect(() => {
        if (transcription_data?.fetchTranscription) {
            stopPolling();
            setInProgress(false);
        }
    }, [transcription_data])

    if (called && loading) return <p>Loading ...</p>
    return (
        <section className="container mx-auto px-4 py-4">
            <h1 className="text-5xl font-extrabold dark:text-white">Transcription</h1>
            <div className="grid  grid-cols-2">
                <div className="col-1 container mx-auto px-4 py-4">
                    <form onSubmit={uploadFile}>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload file</label>
                        <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file" />
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">Upload audio files (MP3, WAV) for transcription (Max. 10MB.)</p>

                        <button type="submit" disabled={inProgress} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            {inProgress ? <><svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                            </svg>
                                Transcribing...</> : 'Upload'}
                        </button>
                    </form>

                    <div>
                    </div>
                </div>
                <div className="col-1 container mx-auto px-4 py-4">
                    <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Transcription output</label>
                    <textarea value={transcription_data?.fetchTranscription} id="message" rows={4} className="block p-2.5 w-full min-h-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your transcription will be written here">
                    </textarea>
                </div>
            </div>
        </section >
    )
}