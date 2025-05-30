import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

// eslint-disable-next-line react/prop-types
export default function Form({ onSubmit }) {
  const [formData, setFormData] = useState({})

  function handleChange(e) {
    const { name, value } = e.target

    setFormData((old) => ({
      ...old,
      [name]: value,
    }))
  }

  return (
    <form
      // eslint-disable-next-line react/prop-types
      onSubmit={onSubmit(formData)}
      className='max-w-screen-sm mx-auto space-y-4'
    >
      <h1 className='text-center text-2xl font-bold'>Add Post</h1>
      <div>
        <Label htmlFor='title' className='text-lg'>
          Title
        </Label>
        <Input
          type='text'
          id='title'
          placeholder='Title'
          name='title'
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor='content' className='text-lg'>
          Content
        </Label>
        <Textarea
          placeholder='your content'
          id='content'
          name='content'
          onChange={handleChange}
        />
      </div>
      <div className='text-end'>
        <Button type='submit'>Post</Button>
      </div>
    </form>
  )
}
