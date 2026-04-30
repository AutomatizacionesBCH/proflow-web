import Link from 'next/link'

export default function IndexPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-8">
      <h1 className="mb-2 text-3xl font-extrabold text-gray-900">ProFlow Brands</h1>
      <p className="mb-10 text-gray-500">Selecciona la marca a visualizar</p>
      <div className="grid gap-6 sm:grid-cols-2">
        <Link
          href="/la-caja-chica"
          className="flex flex-col items-center rounded-2xl border-2 border-[#043D35] bg-white p-10 shadow-md transition-shadow hover:shadow-xl"
        >
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-[#043D35] text-2xl font-extrabold text-white">
            LC
          </div>
          <h2 className="text-xl font-bold text-[#043D35]">La Caja Chica</h2>
          <p className="mt-2 text-sm text-gray-500">lacajachica.cl</p>
        </Link>
        <Link
          href="/proflow-latam"
          className="flex flex-col items-center rounded-2xl border-2 border-[#1E3A8A] bg-white p-10 shadow-md transition-shadow hover:shadow-xl"
        >
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-[#1E3A8A] text-2xl font-extrabold text-white">
            PL
          </div>
          <h2 className="text-xl font-bold text-[#1E3A8A]">ProFlow LATAM</h2>
          <p className="mt-2 text-sm text-gray-500">proflowlatam.com</p>
        </Link>
      </div>
    </main>
  )
}
