import { Button, Dropdown } from "react-bootstrap"
import { useBrowserStore, usePersistentStore } from "../store"
import UserCard from "./UserCard"
import { userService } from "../services"
import { forwardRef, useEffect } from "react"
import { PageDown } from "iconoir-react"
import {
  BrowserViewChangePassword,
  BrowserViewChangePlanRequest,
  BrowserViewLogin,
  BrowserViewProfile,
  BrowserViewRegister,
  BrowserViewTermsOfUse,
} from "../constants"

const CustomToggle = forwardRef(
  (
    props: {
      children?: React.ReactNode
      onClick: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {}
    },
    ref: React.Ref<HTMLAnchorElement>
  ) => (
    <a
      href=""
      className="CustomToggle text-decoration-none d-flex align-items-center"
      ref={ref}
      onClick={(e) => {
        e.preventDefault()
        props.onClick(e)
      }}
    >
      {props.children}
      <PageDown className="ms-2" />
    </a>
  )
)

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
        wsStatus
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
        "[UserArea] @useEffect - ws connected, but no token available. Reset user."
      )
      setUser(null)
    }
  }, [token, wsStatus])

  return (
    <div className="UserArea me-3 d-flex">
      {user !== null ? (
        <>
          <Dropdown align={"start"}>
            <Dropdown.Toggle as={CustomToggle}>
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
                Change Plan
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
        <>
          <Button
            size="sm"
            variant="transparent"
            onClick={() => setView(BrowserViewLogin)}
          >
            Log in
          </Button>
          <Button
            size="sm"
            variant="transparent"
            onClick={() => setView(BrowserViewRegister)}
          >
            Register
          </Button>
        </>
      )}
    </div>
  )
}

export default UserArea
