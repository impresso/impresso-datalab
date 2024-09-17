import { Button } from "react-bootstrap"
import { useBrowserStore, usePersistentStore } from "../store"
import UserCard from "./UserCard"
import { userService } from "../services"
import { useEffect } from "react"

const UserArea = () => {
  const setUser = usePersistentStore((state) => state.setUser)
  const setView = useBrowserStore((state) => state.setView)

  const isWsConnected = useBrowserStore((state) => state.isWsConnected)
  const [token, user] = usePersistentStore((state) => [state.token, state.user])

  useEffect(() => {
    if (!isWsConnected) {
      console.debug("[UserArea] @useEffect - ws not connected")
      return
    }
    if (token !== null) {
      console.debug("[UserArea] @useEffect - ws connected, fetch user ...")
      userService
        .find()
        .then((data) => {
          console.debug("[UserArea] @useEffect - user", data.username)
          setUser({
            ...data,
            email: "***",
          })
        })
        .catch((err) => {
          console.debug("[UserArea] @useEffect - user", err)
          setUser(null)
        })
    } else {
      console.debug(
        "[UserArea] @useEffect - ws connected, but no token available. Reset user.",
      )
      setUser(null)
    }
  }, [token, isWsConnected])

  return (
    <div className="UserArea me-3 d-flex">
      {user !== null ? (
        <UserCard user={user} />
      ) : (
        <>
          <Button
            size="sm"
            variant="transparent"
            onClick={() => setView("login")}
          >
            Log in
          </Button>
          <Button size="sm" variant="transparent">
            Sign up
          </Button>
        </>
      )}
    </div>
  )
}

export default UserArea
