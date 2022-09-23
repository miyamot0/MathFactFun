import { waitFor } from "@testing-library/react";
import { FirestoreAction } from "../../../interfaces/FirebaseInterfaces";
import { dispatchIfNotCancelledHelper } from "../FirebaseDispatchHelpers";

describe("dispatchIfNotCancelledHelper", () => {
  it("Should fire if not cancelled", () => {
    const action = {} as FirestoreAction;
    const isCancelled = false;
    const dispatch = jest.fn();

    dispatchIfNotCancelledHelper({ action, isCancelled, dispatch });

    waitFor(() => {
      expect(dispatch).toBeCalled();
    });
  });

  it("Should NOT fire if cancelled", () => {
    const action = {} as FirestoreAction;
    const isCancelled = true;
    const dispatch = jest.fn();

    dispatchIfNotCancelledHelper({ action, isCancelled, dispatch });

    waitFor(() => {
      expect(dispatch).toBeCalled();
    });
  });
});
