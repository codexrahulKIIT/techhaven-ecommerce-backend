import { redirect } from 'next/navigation'

export default function ProductAliasPage({ params }: { params: { id: string } }) {
  redirect(`/product/${params.id}`)
}
