import { waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { FirestoreAction } from "../../../interfaces/FirebaseInterfaces";
import { dispatchIfNotCancelledHelper } from "../FirebaseDispatchHelpers";

describe("dispatchIfNotCancelledHelper", () => {
  it("Should fire if not cancelled", async () => {
    await act(async () => {
      const action = {} as FirestoreAction;
      const isCancelled = false;
      const dispatch = jest.fn();

      dispatchIfNotCancelledHelper({ action, isCancelled, dispatch });

      await waitFor(() => {
        expect(dispatch).toBeCalled();
      });
    })
  });

  it("Should NOT fire if cancelled", async () => {
    await act(async () => {
      const action = {} as FirestoreAction;
      const isCancelled = true;
      const dispatch = jest.fn();

      dispatchIfNotCancelledHelper({ action, isCancelled, dispatch });

      await waitFor(() => {
        expect(dispatch).not.toBeCalled();
      });
    })
  });
});
