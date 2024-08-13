import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import React, { useEffect, useState } from "react"
import { Button } from "react-bootstrap"
import { ModalLoginView, useBrowserStore, usePersistentStore } from "../store"
import UserCard from "./UserCard"
import { versionService } from "../services"

const UserArea = () => {
  const [view, setView] = useBrowserStore((state) => [
    state.view,
    state.setView,
  ])

  useEffect(() => {
    versionService.find().then((data) => {
      console.info("[UserArea] version", data)
    })
  }, [])

  const user = usePersistentStore((state) => state.user)
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
