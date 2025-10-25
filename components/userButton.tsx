import Link from 'next/link'
import { auth } from '@/auth'
import { signOutUser } from '@/actions/userActions'


const UserButton = async () => {
  const session = await auth()
  console.log("Session from user-button file", session)

  if(!session) {
    return (
      <button>
        <Link href='/sign-in'>
          Sign in
        </Link>
      </button>
    )
  }
  const userImg = session.user?.image;
  const firstInit = session.user?.name?.charAt(0).toUpperCase() ?? 'U';
  return (
    <div className='flex gap-2 items-center'>

            <form action={signOutUser}>
              <button className='w-full py-4 px-2 h-4 justify-start'>Sign out</button>
            </form>

    </div>
  )
}

export default UserButton