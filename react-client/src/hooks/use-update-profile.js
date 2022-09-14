import {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {toast} from 'react-toastify'

import {useUpdateUserMutation} from 'store/api/auth'
import {updateUser as updateUserInStore} from 'store/reducers/auth'

const __getProfileData = user => {
  let dob = user.dob
  if (dob) {
    const date = new Date(user.dob).toISOString()
    dob = date.slice(0, 10)
  } else {
    const now = new Date(Date.now()).toISOString()
    dob = now.slice(0, 10)
  }

  return {
    name: user.name,
    dob,
    email: user.email,
    gender: user.gender || 'male',
    country: user.country,
  }
}

export default function useProfileUpdate() {
  const dispatch = useDispatch()
  const user = useSelector(s => s.auth.user)
  const [data, setData] = useState(() => __getProfileData(user))

  const [updateUser, {isLoading}] = useUpdateUserMutation()

  const isEmailNotChangeable = Boolean(
    data.email.endsWith('@facebook.com') || data.email.endsWith('@google.com'),
  )

  const handleFormSubmission = async e => {
    e.preventDefault()

    const date = data.dob?.split('-')
    const jsDate = new Date(date[0], date[1], date[2])

    if (isEmailNotChangeable && data.email !== user.email) {
      return toast.error("this Email couldn't be changed!")
    }

    const result = await updateUser({...data, dob: jsDate.getTime()})
    if (result.data.data.user) {
      dispatch(updateUserInStore(result.data.data.user))
      toast.success('User Successfully updated!')
    } else {
      toast.error(result.error?.data?.message || result.error.error)
    }
  }

  return {data, setData, isEmailNotChangeable, isLoading, handleFormSubmission}
}
