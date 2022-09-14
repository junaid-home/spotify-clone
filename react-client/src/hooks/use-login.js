import {useState, useLayoutEffect} from 'react'
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'

import {resetError} from 'store/reducers/auth'
import {useLoginWithEmailAndPasswordMutation} from 'store/api/auth'

export default function useLogin() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [loginWithEmailAndPassword, {isLoading: isLoggingIn}] =
    useLoginWithEmailAndPasswordMutation()

  const handleFormSubmission = async e => {
    e.preventDefault()
    dispatch(resetError())

    const result = await loginWithEmailAndPassword({email, password: pass})
    if (result?.data?.data?.user) {
      navigate('/', {replace: true})
    }
  }

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
    dispatch(resetError())
  }, [dispatch])

  return {handleFormSubmission, email, setEmail, pass, setPass, isLoggingIn}
}
