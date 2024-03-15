import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import React from "react"
import { Button } from "react-bootstrap"
import { ModalLoginView, useBrowserStore, usePersistentStore } from "../store"
import UserCard from "./UserCard"

const UserArea = () => {
  const [view, setView] = useBrowserStore((state) => [
    state.view,
    state.setView,
  ])
  const [user, token, resetUser, patchUser] = usePersistentStore((state) => [
    state.user,
    state.token,
    state.resetUser,
  ])
  const { status, data, error } = useQuery({
    queryKey: ["me"],
    queryFn: () =>
      axios
        .get("/api/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => res.data),
    retry: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    enabled: user === null && token !== null,
  })
  if (status === "error" && error.response?.status === 401) {
    console.warn("[UserArea] token is incorrect. ", error.response.data)
    // clean up the token(s) and user(s) from the store
    resetUser()
  } else if (status === "success") {
    patchUser(data)
  }
  console.info("[UserArea] user", user, "status", status)
  return (
    <div className="UserArea me-3 d-flex">
      {user !== null ? (
        <>
          <UserCard user={user} />
        </>
      ) : (
        <>
          <Button
            size="sm"
            variant="transparent"
            onClick={() => setView(ModalLoginView)}
          >
            Log in
          </Button>
          <Button size="sm" variant="transparent">
            Sign up {view}
          </Button>
        </>
      )}
    </div>
  )
}

export default UserArea
