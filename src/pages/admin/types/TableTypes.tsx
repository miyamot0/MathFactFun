/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export type ColumnType = {
    label?: string
    field?: string
    sort?: string
    width?: number
    searchable?: boolean
    [rest: string]: any
}
