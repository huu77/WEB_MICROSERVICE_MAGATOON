import { useRouteError } from 'react-router-dom'

export default function Error() {
    const error = useRouteError()
    return (
        <h1>{error.statusText} {error.message}</h1>
    )
}