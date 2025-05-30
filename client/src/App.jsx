import { useEffect, useState } from "react"
import Form from "./components/Form"
import Lists from "./components/Lists"

function App() {
  const [posts, setPosts] = useState([])
  const [isSuccess, setIsSuccess] = useState(false)

  function submitForm(data) {
    return async (e) => {
      e.preventDefault()
      const query = `mutation {
  addPost(inputPost:{title:"${data.title}",content:"${data.content}",authorId:"2"}){
    title
  }
}`

      const res = await fetch("http://localhost:4000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      })

      const resData = await res.json()

      if (resData?.errors?.length > 0) {
        console.log("input invalid")
        setIsSuccess(false)
      } else {
        setIsSuccess(true)
      }
    }
  }

  useEffect(() => {
    const controller = new AbortController()

    async function getPosts() {
      const query = `{
                posts{
                  id
                  title
                  content
                  author{
                    name
                  }
                }
              }`

      const res = await fetch("http://localhost:4000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        signal: controller.signal,
        body: JSON.stringify({ query }),
      })

      const { data } = await res.json()

      setPosts(data?.posts)

      return () => {
        controller.abort()
      }
    }

    getPosts()
  }, [isSuccess])

  return (
    <main className='max-w-screen-md mx-auto px-4 py-8 md:px-0'>
      <Form onSubmit={submitForm} />
      <Lists posts={posts} />
    </main>
  )
}

export default App
