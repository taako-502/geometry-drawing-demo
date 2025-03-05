// pages/HomeMenu.tsx
import { Link } from 'react-router-dom'

export default function HomeMenu() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-6">メニュー</h1>
      <nav>
        <ul>
          <li className="mb-4">
            <Link
              to="/sample/1"
              className="text-blue-500 hover:underline text-xl"
            >
              コンパス作図ツール（サンプル）
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to="/sample/2"
              className="text-blue-500 hover:underline text-xl"
            >
              コンパス作図ツール（Paper.js）
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
