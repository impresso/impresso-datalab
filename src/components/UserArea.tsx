import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useEffect, useState } from "react"
import { Button } from "react-bootstrap"
import { useBrowserStore, usePersistentStore } from "../store"
import UserCard from "./UserCard"
import { userService } from "../services"

const UserArea = () => {
  const [setView] = useBrowserStore((state) => [state.setView])
  const user = usePersistentStore((state) => state.user)

  useEffect(() => {
    console.info("[UserArea] load user...", user)
    if (user !== null) {
      console.info("[UserArea] user", user)
    }
    //
  }, [user])

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
