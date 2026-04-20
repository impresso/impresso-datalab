import { Dropdown } from "react-bootstrap"
import { useBrowserStore, usePersistentStore } from "../store"
import UserCard from "./UserCard"
import { userService } from "../services"
import { useEffect } from "react"
import {
  BrowserViewChangePassword,
  BrowserViewChangePlanRequest,
  BrowserViewLogin,
  BrowserViewProfile,
  BrowserViewRegister,
  BrowserViewTermsOfUse,
} from "../constants"

import DropdownCustomToggle from "./DropdownCustomToggle"

const UserArea = () => {
  const [setUser, logout] = usePersistentStore((state) => [
    state.setUser,
    state.reset,
  ])
  const setView = useBrowserStore((state) => state.setView)

  const wsStatus = useBrowserStore((state) => state.wsStatus)
  const [token, user, userPlan] = usePersistentStore((state) => [
    state.token,
    state.user,
    state.userPlan,
  ])

  useEffect(() => {
    if (wsStatus !== "connected") {
      console.debug(
        "[UserArea] @useEffect - ws not connected, current status",
        wsStatus,
      )
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
  }, [token, wsStatus])

  return (
    <div className="UserArea d-flex">
      {user !== null ? (
        <>
          <Dropdown align={"start"}>
            <Dropdown.Toggle as={DropdownCustomToggle}>
              <UserCard user={user} userPlan={userPlan} />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setView(BrowserViewProfile)}>
                Profile
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setView(BrowserViewChangePassword)}>
                Change Password
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => setView(BrowserViewChangePlanRequest)}
              >
                Request change of plan
              </Dropdown.Item>
              <Dropdown.Item onClick={logout}>Log out</Dropdown.Item>
              {/* add separator */}
              <Dropdown.Divider />

              <Dropdown.Item href="/datalab/corpus-overview">
                Corpus Overview
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setView(BrowserViewTermsOfUse)}>
                Terms Of Use
              </Dropdown.Item>
              {/* add separator */}
              <Dropdown.Divider />
              <Dropdown.Item
                target="_blank"
                href={import.meta.env.PUBLIC_DISCUSSION_CHANNEL_URL}
              >
                Join our Discord Channel
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </>
      ) : (
        <ul className="navbar-nav">
          <li className="navbar-item">
            <a
              className="text-decoration-none text-reset nav-link  "
              href=""
              onClick={(e) => {
                setView(BrowserViewLogin)
                e.preventDefault()
              }}
            >
              <span className="small-caps">Log in</span>
            </a>
          </li>
          <li className="navbar-text mx-1">|</li>
          <li className="navbar-item">
            <a
              className="text-decoration-none text-reset nav-link  "
              href=""
              onClick={(e) => {
                setView(BrowserViewRegister)
                e.preventDefault()
              }}
            >
              <span className="small-caps">Register</span>
            </a>
          </li>
        </ul>
      )}
    </div>
  )
}

export default UserArea
