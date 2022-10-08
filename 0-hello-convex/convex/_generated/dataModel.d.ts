/* eslint-disable */
/**
 * Generated data model types.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * Generated by convex@0.2.1.
 * To regenerate, run `npx convex codegen`.
 * @module
 */

import { AnyDataModel } from "convex/server";
import { GenericId } from "convex/values";

/**
 * No `schema.ts` file found!
 *
 * This generated code has permissive types like `Document = any` because
 * Convex doesn't know your schema. If you'd like more type safety, see
 * https://docs.convex.dev/using/schemas for instructions on how to add a
 * schema file.
 *
 * After you write a schema, rerun codegen with `npx convex codegen`.
 */

/**
 * The names of all of your Convex tables.
 */
export type TableNames = string;

/**
 * The type of a document stored in Convex.
 */
export type Document = any;

/**
 * An identifier for a document in Convex.
 *
 * Convex documents are uniquely identified by their `Id`, which is accessible
 * on the `_id` field. To learn more, see [Data Modeling](https://docs.convex.dev/using/data-modeling).
 *
 * Documents can be loaded using `db.get(id)` in query and mutation functions.
 *
 * **Important**: Use `myId.equals(otherId)` to check for equality.
 * Using `===` will not work because two different instances of `Id` can refer
 * to the same document.
 */
export type Id = GenericId<string>;
export declare const Id: typeof GenericId;

/**
 * A type describing your Convex data model.
 *
 * This type includes information about what tables you have, the type of
 * documents stored in those tables, and the indexes defined on them.
 *
 * This type is used to parameterize methods like `queryGeneric` and
 * `mutationGeneric` to make them type-safe.
 */
export type DataModel = AnyDataModel;
