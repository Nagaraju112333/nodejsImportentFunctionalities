const CODES = {
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not Found",
    500: "Internal server Error",
  };
  async function fcnEleMatch(code, elements) {
    let errors = [];
    for (let i = 0; i < elements.length; i++) {
      await errors.push({
        errors: "Required field '" + elements[i] + "' not found",
        element: elements[i],
      });
    }
    throw new Error(
      JSON.stringify({
        code: code,
        errors: errors,
      })
    );
  }
  
  async function fcnCustomError(code, errors) {
    throw new Error(
      JSON.stringify({
        code: code,
        errors: errors,
      })
    );
  }
  async function fcnCustomRedirectError(code, errors, redirect, data) {
    throw new Error(
      JSON.stringify({
        code: code,
        errors: errors,
        redirect: redirect,
        data: data,
      })
    );
  }
  
  exports.errorHandler = {
    fcnEleMatch: fcnEleMatch,
    fcnCustomError: fcnCustomError,
    fcnCustomRedirectError: fcnCustomRedirectError,
  };
  