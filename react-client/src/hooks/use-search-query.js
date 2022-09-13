import {useState, useEffect, useDeferredValue, useTransition} from 'react'

import {useQueryDataMutation} from 'store/api/search'

export default function useSearchQuery() {
  const [query, setQuery] = useState('')
  const defferedQuery = useDeferredValue(query)
  const [, startTransition] = useTransition()

  const [searchQuery] = useQueryDataMutation()

  useEffect(() => {
    if (defferedQuery.length) {
      startTransition(() => {
        searchQuery({query: defferedQuery.toLowerCase()})
      })
    }
  }, [defferedQuery, searchQuery])

  return [query, setQuery]
}
