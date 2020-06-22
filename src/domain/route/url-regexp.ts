const OPTIONAL_PARAM_REGEXP = /\((.*?)\)/g;
const NAMED_PARAM_REGEXP = /(\(\?)?:\w+/g;
const ESCAPE_REGEXP = /[\-{}\[\]+?.,\\\^$|#\s]/g;
const SPLAT_PARAM = /\*/g;

export {
  OPTIONAL_PARAM_REGEXP,
  NAMED_PARAM_REGEXP,
  ESCAPE_REGEXP,
  SPLAT_PARAM,
};
