type ErrorMessageProps = {
    message: string
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <p className="bg-red-50 text-red-400 w-full px-2 py-1 text-sm rounded-md uppercase font-bold text-center mt-2">
        {message}
    </p>
  )
}
