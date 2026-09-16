import { useState } from 'react'

const ProfilePage = () => {
  const [name, setName] = useState('')
  const [bio, setBio] = useState('')
  const [image, setImage] = useState('')

  const handleImageChange = (event) => {
    const file = event.target.files?.[0]
    if (file) setImage(URL.createObjectURL(file))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    // Connect this handler to the profile API when it is available.
  }

  return (
    <div className='flex min-h-screen w-full items-center justify-center bg-slate-950 px-4 py-8 text-white'>
      <form onSubmit={handleSubmit} className='w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl sm:p-8'>
        <div className='mb-8'>
          <h1 className='text-2xl font-semibold'>Edit profile</h1>
          <p className='mt-1 text-sm text-slate-400'>Update your profile information.</p>
        </div>

        <div className='mb-7 flex flex-col items-center'>
          <div className='mb-4 flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-indigo-600 text-4xl font-semibold text-white'>
            {image ? <img src={image} alt='Profile preview' className='h-full w-full object-cover' /> : name.charAt(0).toUpperCase() || 'U'}
          </div>
          <label className='cursor-pointer text-sm font-medium text-indigo-400 hover:text-indigo-300'>
            Change profile image
            <input type='file' accept='image/*' onChange={handleImageChange} className='hidden' />
          </label>
        </div>

        <div className='space-y-5'>
          <div>
            <label htmlFor='name' className='mb-2 block text-sm font-medium text-slate-200'>Name</label>
            <input id='name' type='text' value={name} onChange={(event) => setName(event.target.value)} placeholder='Your name' required className='w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none transition placeholder:text-slate-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500' />
          </div>

          <div>
            <label htmlFor='bio' className='mb-2 block text-sm font-medium text-slate-200'>Bio</label>
            <textarea id='bio' value={bio} onChange={(event) => setBio(event.target.value)} placeholder='Tell people a little about yourself' rows='4' maxLength='160' className='w-full resize-none rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none transition placeholder:text-slate-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500' />
            <p className='mt-1 text-right text-xs text-slate-500'>{bio.length}/160</p>
          </div>
        </div>

        <button type='submit' className='mt-7 w-full rounded-lg bg-indigo-600 px-4 py-3 font-medium transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-900'>
          Save changes
        </button>
      </form>
    </div>
  )
}

export default ProfilePage
