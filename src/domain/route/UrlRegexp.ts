const OPTIONAL_PARAM_REGEXP = /\((.*?)\)/g;
const NAMED_PARAM_REGEXP = /(\(\?)?:\w+/g;
const ESCAPE_REGEXP = /[\-{}\[\]+?.,\\\^$|#\s]/g;
const SPLAT_PARAM_REGEXP = /\*/g;

export {
  ESCAPE_REGEXP,
  NAMED_PARAM_REGEXP,
  OPTIONAL_PARAM_REGEXP,
  SPLAT_PARAM_REGEXP,
};
