import Link from 'next/link'

export default function HomeMenu() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-6">メニュー</h1>
      <nav>
        <ul>
          <li className="mb-4">
            <Link
              href="/sample/1"
              className="text-blue-500 hover:underline text-xl"
            >
              コンパス作図ツール（サンプル）
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
