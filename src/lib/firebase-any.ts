import { firebase } from "@/integrations/firebase/client";
/**
 * Untyped Firebase client for admin CRUD operations where we work with
 * dynamic collection names that the generated types don't allow.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const firebaseAny: any = firebase;
