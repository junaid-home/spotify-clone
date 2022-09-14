import {useState, useLayoutEffect} from 'react'
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'

import {resetError} from 'store/reducers/auth'
import {useSignUpWithPersonalDetailsMutation} from 'store/api/auth'

export default function useSignup() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [data, setData] = useState({
    name: '',
    dob: '',
    email: '',
    password: '',
    gender: 'male',
    country: '',
  })
  const [signUpWithPersonalDetails, {isLoading: isSigningUp}] =
    useSignUpWithPersonalDetailsMutation()

  const handleFormSubmission = async e => {
    e.preventDefault()
    dispatch(resetError())

    const date = data.dob.split('-')
    const jsDate = new Date(date[0], date[1], date[2])

    const result = await signUpWithPersonalDetails({
      ...data,
      dob: jsDate.getTime(),
    })

    if (result?.data?.data?.user) {
      return navigate('/', {replace: true})
    }
  }

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
    dispatch(resetError())
  }, [dispatch])

  return {handleFormSubmission, data, setData, isSigningUp}
}
