import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import React from "react"
import { Button } from "react-bootstrap"
import { ModalLoginView, useBrowserStore } from "../store"

const UserArea = () => {
  const setView = useBrowserStore((state) => state.setView)
  const { status, data, error } = useQuery({
    queryKey: ["me"],
    queryFn: () => axios.get(`/api/me`),
    retry: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })

  console.log("[UserArea]", status, data, error)
  return (
    <div className="UserArea">
      <Button
        size="sm"
        variant="transparent"
        onClick={() => setView(ModalLoginView)}
      >
        Log in
      </Button>
      <Button size="sm" variant="transparent">
        Sign up {process.env.GATSBY_IMPRESSO_API_URL}
      </Button>
    </div>
  )
}

export default UserArea
