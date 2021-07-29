import useSWR from 'swr'
import api from '~/services/api'

export function useFetch<Data>(url: string) {
  const { data, error, isValidating } = useSWR<Data>(url, async (url) => {
    const response = await api.get(url)

    return response.data
  })

  return {
    data,
    isLoading: !error && !data,
    isError: error,
    isValidating,
  }
}
