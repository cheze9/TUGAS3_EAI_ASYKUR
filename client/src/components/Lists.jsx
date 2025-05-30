/* eslint-disable react/prop-types */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// eslint-disable-next-line react/prop-types
export default function Lists({ posts }) {
  return (
    <section className='mt-8 space-y-4'>
      {posts?.map((post) => (
        <Card key={post.id}>
          <CardHeader>
            <CardTitle>{post.title}</CardTitle>
            <small className='text-zinc-400 text-sm italic'>{post.author.name}</small>
          </CardHeader>
          <CardContent>
            <p>{post.content}</p>
          </CardContent>
        </Card>
      ))}
    </section>
  )
}
