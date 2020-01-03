import { Dimensions } from 'react-native'

/**
 * UI helper functions for the bounds, margin, etc calculation
 */

/**
 * Returns the screen dimension.
 *
 * @returns {number}
 */
export function getViewPortDimension() {
  return Dimensions.get('window')
}

/**
 * Returns the screen height.
 *
 *  @returns {number}
 */
export function getViewPortHeight() {
  return getViewPortDimension().height
}

/**
 * Returns the screen width.
 *
 * @returns {number}
 */
export function getViewPortWidth() {
  return getViewPortDimension().width
}

/**
 * Returns the screen width ratio.
 *
 * @param {number} percentageWidth
 * @returns {number}
 */
export function getWidthRatio(percentageWidth = 100) {
  return getViewPortWidth() * (percentageWidth / 100)
}

/**
 * Returns the screen height ratio.
 *
 * @param {number} percentageHeight
 * @returns {number}
 */
export function getHeightRatio(percentageHeight = 100) {
  return getViewPortHeight() * (percentageHeight / 100)
}

/**
 * Returns the margin; Consistently use the same margin.
 *
 * @returns {number}
 */
export function getMargin() {
  return getWidthRatio(6.25) - 10
}

/**
 * Returns the header height.
 *
 * @returns {number}
 */
export function getHeaderHeight() {
  return getViewPortWidth() * (1 - getViewPortWidth() / getViewPortHeight())
}
