import React from 'react'
import { Card } from './ui/card'
import { User } from 'lucide-react'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'

const CreatePost = () => {
  return (
    <Card>
        <div className='flex px-3 py-4 gap-3'>
            
            <User />

            <Textarea
              className='min-h-[100px] border-none outline-none' 
              // className='min-h-[100px] resize-none border-none focus-visible:ring-0 p-0 text-base' 
            />

        </div>

        <div className='flex justify-end py-2 px-2'>
          <Button>Post</Button>
        </div>
    </Card>
  )
}

export default CreatePost