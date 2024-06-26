import Card from '../../components/card'

export default function DashboardPage(): JSX.Element {
  return (
    <div className="flex flex-wrap m-4">
      <div className="m-2">
        <Card label='Transcriptions' url='/dashboard/transcription'>
          <svg className="w-32 h-32 text-gray-500 dark:text-gray-400 mb-3" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Card>
      </div>
      <div className="m-2">
        <Card label='Transcriptions' url='#' />
      </div>
      <div className="m-2">
        <Card label='Transcriptions' url='#' />
      </div>
    </div>
  )
}
