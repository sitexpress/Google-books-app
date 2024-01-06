import { appActions, AppInitialStateType, appReducer } from "./appSlice"
import { ErrorMessageType } from "../common/types/types"

let startState: AppInitialStateType

beforeEach(() => {
    startState = {
        isError: false,
        isLoading: false,
        errorMessage: { message: "" } as ErrorMessageType
    }
})

test("error should be set on true", () => {
    const endState = appReducer(startState, appActions.setAppError({ isError: true }))
    expect(endState.isError).toBe(true)
})

test("correct error message should be set", () => {
    const endState = appReducer(startState, appActions.setAppErrorMessage({ errorMessage: "some error" }))
    expect(endState.errorMessage.message).toBe("some error")
})

test("status should be set on true", () => {
    const endState = appReducer(startState, appActions.setAppLoading({ isLoading: true }))
    expect(endState.isLoading).toBe(true)
})
