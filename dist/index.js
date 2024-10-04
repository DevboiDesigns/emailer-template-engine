"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// node_modules/dotenv/package.json
var require_package = __commonJS({
  "node_modules/dotenv/package.json"(exports2, module2) {
    module2.exports = {
      name: "dotenv",
      version: "16.4.5",
      description: "Loads environment variables from .env file",
      main: "lib/main.js",
      types: "lib/main.d.ts",
      exports: {
        ".": {
          types: "./lib/main.d.ts",
          require: "./lib/main.js",
          default: "./lib/main.js"
        },
        "./config": "./config.js",
        "./config.js": "./config.js",
        "./lib/env-options": "./lib/env-options.js",
        "./lib/env-options.js": "./lib/env-options.js",
        "./lib/cli-options": "./lib/cli-options.js",
        "./lib/cli-options.js": "./lib/cli-options.js",
        "./package.json": "./package.json"
      },
      scripts: {
        "dts-check": "tsc --project tests/types/tsconfig.json",
        lint: "standard",
        "lint-readme": "standard-markdown",
        pretest: "npm run lint && npm run dts-check",
        test: "tap tests/*.js --100 -Rspec",
        "test:coverage": "tap --coverage-report=lcov",
        prerelease: "npm test",
        release: "standard-version"
      },
      repository: {
        type: "git",
        url: "git://github.com/motdotla/dotenv.git"
      },
      funding: "https://dotenvx.com",
      keywords: [
        "dotenv",
        "env",
        ".env",
        "environment",
        "variables",
        "config",
        "settings"
      ],
      readmeFilename: "README.md",
      license: "BSD-2-Clause",
      devDependencies: {
        "@definitelytyped/dtslint": "^0.0.133",
        "@types/node": "^18.11.3",
        decache: "^4.6.1",
        sinon: "^14.0.1",
        standard: "^17.0.0",
        "standard-markdown": "^7.1.0",
        "standard-version": "^9.5.0",
        tap: "^16.3.0",
        tar: "^6.1.11",
        typescript: "^4.8.4"
      },
      engines: {
        node: ">=12"
      },
      browser: {
        fs: false
      }
    };
  }
});

// node_modules/dotenv/lib/main.js
var require_main = __commonJS({
  "node_modules/dotenv/lib/main.js"(exports2, module2) {
    "use strict";
    var fs2 = require("fs");
    var path2 = require("path");
    var os = require("os");
    var crypto = require("crypto");
    var packageJson = require_package();
    var version = packageJson.version;
    var LINE = /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg;
    function parse(src) {
      const obj = {};
      let lines = src.toString();
      lines = lines.replace(/\r\n?/mg, "\n");
      let match;
      while ((match = LINE.exec(lines)) != null) {
        const key = match[1];
        let value = match[2] || "";
        value = value.trim();
        const maybeQuote = value[0];
        value = value.replace(/^(['"`])([\s\S]*)\1$/mg, "$2");
        if (maybeQuote === '"') {
          value = value.replace(/\\n/g, "\n");
          value = value.replace(/\\r/g, "\r");
        }
        obj[key] = value;
      }
      return obj;
    }
    function _parseVault(options) {
      const vaultPath = _vaultPath(options);
      const result = DotenvModule.configDotenv({ path: vaultPath });
      if (!result.parsed) {
        const err = new Error(`MISSING_DATA: Cannot parse ${vaultPath} for an unknown reason`);
        err.code = "MISSING_DATA";
        throw err;
      }
      const keys = _dotenvKey(options).split(",");
      const length = keys.length;
      let decrypted;
      for (let i = 0; i < length; i++) {
        try {
          const key = keys[i].trim();
          const attrs = _instructions(result, key);
          decrypted = DotenvModule.decrypt(attrs.ciphertext, attrs.key);
          break;
        } catch (error) {
          if (i + 1 >= length) {
            throw error;
          }
        }
      }
      return DotenvModule.parse(decrypted);
    }
    function _log(message) {
      console.log(`[dotenv@${version}][INFO] ${message}`);
    }
    function _warn(message) {
      console.log(`[dotenv@${version}][WARN] ${message}`);
    }
    function _debug(message) {
      console.log(`[dotenv@${version}][DEBUG] ${message}`);
    }
    function _dotenvKey(options) {
      if (options && options.DOTENV_KEY && options.DOTENV_KEY.length > 0) {
        return options.DOTENV_KEY;
      }
      if (process.env.DOTENV_KEY && process.env.DOTENV_KEY.length > 0) {
        return process.env.DOTENV_KEY;
      }
      return "";
    }
    function _instructions(result, dotenvKey) {
      let uri;
      try {
        uri = new URL(dotenvKey);
      } catch (error) {
        if (error.code === "ERR_INVALID_URL") {
          const err = new Error("INVALID_DOTENV_KEY: Wrong format. Must be in valid uri format like dotenv://:key_1234@dotenvx.com/vault/.env.vault?environment=development");
          err.code = "INVALID_DOTENV_KEY";
          throw err;
        }
        throw error;
      }
      const key = uri.password;
      if (!key) {
        const err = new Error("INVALID_DOTENV_KEY: Missing key part");
        err.code = "INVALID_DOTENV_KEY";
        throw err;
      }
      const environment = uri.searchParams.get("environment");
      if (!environment) {
        const err = new Error("INVALID_DOTENV_KEY: Missing environment part");
        err.code = "INVALID_DOTENV_KEY";
        throw err;
      }
      const environmentKey = `DOTENV_VAULT_${environment.toUpperCase()}`;
      const ciphertext = result.parsed[environmentKey];
      if (!ciphertext) {
        const err = new Error(`NOT_FOUND_DOTENV_ENVIRONMENT: Cannot locate environment ${environmentKey} in your .env.vault file.`);
        err.code = "NOT_FOUND_DOTENV_ENVIRONMENT";
        throw err;
      }
      return { ciphertext, key };
    }
    function _vaultPath(options) {
      let possibleVaultPath = null;
      if (options && options.path && options.path.length > 0) {
        if (Array.isArray(options.path)) {
          for (const filepath of options.path) {
            if (fs2.existsSync(filepath)) {
              possibleVaultPath = filepath.endsWith(".vault") ? filepath : `${filepath}.vault`;
            }
          }
        } else {
          possibleVaultPath = options.path.endsWith(".vault") ? options.path : `${options.path}.vault`;
        }
      } else {
        possibleVaultPath = path2.resolve(process.cwd(), ".env.vault");
      }
      if (fs2.existsSync(possibleVaultPath)) {
        return possibleVaultPath;
      }
      return null;
    }
    function _resolveHome(envPath) {
      return envPath[0] === "~" ? path2.join(os.homedir(), envPath.slice(1)) : envPath;
    }
    function _configVault(options) {
      _log("Loading env from encrypted .env.vault");
      const parsed = DotenvModule._parseVault(options);
      let processEnv = process.env;
      if (options && options.processEnv != null) {
        processEnv = options.processEnv;
      }
      DotenvModule.populate(processEnv, parsed, options);
      return { parsed };
    }
    function configDotenv(options) {
      const dotenvPath = path2.resolve(process.cwd(), ".env");
      let encoding = "utf8";
      const debug = Boolean(options && options.debug);
      if (options && options.encoding) {
        encoding = options.encoding;
      } else {
        if (debug) {
          _debug("No encoding is specified. UTF-8 is used by default");
        }
      }
      let optionPaths = [dotenvPath];
      if (options && options.path) {
        if (!Array.isArray(options.path)) {
          optionPaths = [_resolveHome(options.path)];
        } else {
          optionPaths = [];
          for (const filepath of options.path) {
            optionPaths.push(_resolveHome(filepath));
          }
        }
      }
      let lastError;
      const parsedAll = {};
      for (const path3 of optionPaths) {
        try {
          const parsed = DotenvModule.parse(fs2.readFileSync(path3, { encoding }));
          DotenvModule.populate(parsedAll, parsed, options);
        } catch (e) {
          if (debug) {
            _debug(`Failed to load ${path3} ${e.message}`);
          }
          lastError = e;
        }
      }
      let processEnv = process.env;
      if (options && options.processEnv != null) {
        processEnv = options.processEnv;
      }
      DotenvModule.populate(processEnv, parsedAll, options);
      if (lastError) {
        return { parsed: parsedAll, error: lastError };
      } else {
        return { parsed: parsedAll };
      }
    }
    function config2(options) {
      if (_dotenvKey(options).length === 0) {
        return DotenvModule.configDotenv(options);
      }
      const vaultPath = _vaultPath(options);
      if (!vaultPath) {
        _warn(`You set DOTENV_KEY but you are missing a .env.vault file at ${vaultPath}. Did you forget to build it?`);
        return DotenvModule.configDotenv(options);
      }
      return DotenvModule._configVault(options);
    }
    function decrypt(encrypted, keyStr) {
      const key = Buffer.from(keyStr.slice(-64), "hex");
      let ciphertext = Buffer.from(encrypted, "base64");
      const nonce = ciphertext.subarray(0, 12);
      const authTag = ciphertext.subarray(-16);
      ciphertext = ciphertext.subarray(12, -16);
      try {
        const aesgcm = crypto.createDecipheriv("aes-256-gcm", key, nonce);
        aesgcm.setAuthTag(authTag);
        return `${aesgcm.update(ciphertext)}${aesgcm.final()}`;
      } catch (error) {
        const isRange = error instanceof RangeError;
        const invalidKeyLength = error.message === "Invalid key length";
        const decryptionFailed = error.message === "Unsupported state or unable to authenticate data";
        if (isRange || invalidKeyLength) {
          const err = new Error("INVALID_DOTENV_KEY: It must be 64 characters long (or more)");
          err.code = "INVALID_DOTENV_KEY";
          throw err;
        } else if (decryptionFailed) {
          const err = new Error("DECRYPTION_FAILED: Please check your DOTENV_KEY");
          err.code = "DECRYPTION_FAILED";
          throw err;
        } else {
          throw error;
        }
      }
    }
    function populate(processEnv, parsed, options = {}) {
      const debug = Boolean(options && options.debug);
      const override = Boolean(options && options.override);
      if (typeof parsed !== "object") {
        const err = new Error("OBJECT_REQUIRED: Please check the processEnv argument being passed to populate");
        err.code = "OBJECT_REQUIRED";
        throw err;
      }
      for (const key of Object.keys(parsed)) {
        if (Object.prototype.hasOwnProperty.call(processEnv, key)) {
          if (override === true) {
            processEnv[key] = parsed[key];
          }
          if (debug) {
            if (override === true) {
              _debug(`"${key}" is already defined and WAS overwritten`);
            } else {
              _debug(`"${key}" is already defined and was NOT overwritten`);
            }
          }
        } else {
          processEnv[key] = parsed[key];
        }
      }
    }
    var DotenvModule = {
      configDotenv,
      _configVault,
      _parseVault,
      config: config2,
      decrypt,
      parse,
      populate
    };
    module2.exports.configDotenv = DotenvModule.configDotenv;
    module2.exports._configVault = DotenvModule._configVault;
    module2.exports._parseVault = DotenvModule._parseVault;
    module2.exports.config = DotenvModule.config;
    module2.exports.decrypt = DotenvModule.decrypt;
    module2.exports.parse = DotenvModule.parse;
    module2.exports.populate = DotenvModule.populate;
    module2.exports = DotenvModule;
  }
});

// src/index.ts
var src_exports = {};
__export(src_exports, {
  EmailTemplates: () => EmailTemplates,
  EmailerEngine: () => EmailerEngine,
  SendGrid: () => SendGrid
});
module.exports = __toCommonJS(src_exports);

// src/templates/index.ts
var import_fs = __toESM(require("fs"));
var import_node_path = __toESM(require("path"));
var import_mjml = __toESM(require("mjml"));
var import_handlebars = __toESM(require("handlebars"));
var { compile } = import_handlebars.default;
var loadviewfromfile = (filename) => {
  const fullPath = import_node_path.default.join(__dirname, filename);
  try {
    const view = import_fs.default.readFileSync(fullPath, "utf8");
    const template = compile(view);
    return template;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
var _EmailTemplates = class _EmailTemplates {
};
//**** ------- TEMPLATE 001 ------- ****
// Advice Market - Questions and Consultation are now free
// Black background with white text and blue button that opens the app
_EmailTemplates.getTemplate001 = () => __async(_EmailTemplates, null, function* () {
  const subject = `Free Advice Market Features`;
  const template = loadviewfromfile("template_001.mjml");
  const context = {
    offerInfo: "* Offer valid for a limited time",
    bodyMessage: "Questions & Consultations are now Free!",
    bodyHeader: "Advice Market",
    titleMessage: "StockLift",
    bodySubMessage: "It has never been faster to connect with an Expert"
  };
  const mjml = template(context);
  const html = (0, import_mjml.default)(mjml);
  if (html.errors.length) {
    console.error(html.errors);
  }
  return { html: html.html, subject };
});
var EmailTemplates = _EmailTemplates;

// src/config/env.keys.ts
var import_dotenv = __toESM(require_main());
(0, import_dotenv.config)();
var SENDGRID_KEY = process.env.SENDGRID_KEY || "";

// src/config/sendgrid.ts
var import_mail = __toESM(require("@sendgrid/mail"));
import_mail.default.setApiKey(SENDGRID_KEY);
var sendgrid_default = import_mail.default;

// src/libs/sendgrid.lib.ts
var import_lodash = __toESM(require("lodash"));
var _SendGrid = class _SendGrid {
};
// ---------------- FROM EMAIL
_SendGrid.fromEmail = "visrule@pm.me";
//* MULTLIPLE EMAILS
_SendGrid.sendSmallBatch = (emails, subject, html) => __async(_SendGrid, null, function* () {
  try {
    yield sendgrid_default.sendMultiple(_SendGrid.makeEmails(emails, subject, html));
  } catch (err) {
    console.error(err);
    console.error("Error sending multiple emails");
    throw new Error("Error sending multiple emails");
  }
});
//* SINGLE EMAIL
_SendGrid.sendSingleEmail = (email, subject, html) => __async(_SendGrid, null, function* () {
  try {
  } catch (err) {
    console.error(err);
    console.error("Error sending email-sendEmail");
    throw new Error("Error sending email-sendEmail");
  }
});
//* SINGLE EMAIL with Attachmentn
_SendGrid.sendEmailWAttachment = (email, subject, html, attachment, fileName, fileType) => __async(_SendGrid, null, function* () {
  try {
    yield sendgrid_default.send(
      _SendGrid.makeEmailWithAttachment(
        email,
        subject,
        html,
        attachment,
        fileName,
        fileType
      )
    );
  } catch (err) {
    console.error(err);
    console.error("Error sending email--sendEmailWAttachment");
    throw new Error("Error sending email--sendEmailWAttachment");
  }
});
_SendGrid.sendLargeBatch = (subject, html, emails) => __async(_SendGrid, null, function* () {
  try {
    emails = emails.filter(
      (email) => email !== void 0 && email !== "" && email !== null
    );
    const batches = import_lodash.default.chunk(emails, 500);
    for (const batch of batches) {
      yield sendgrid_default.sendMultiple(_SendGrid.makeEmails(batch, subject, html));
    }
  } catch (err) {
    console.error(err);
    console.error("Error sending email--sendToAllUsers");
  }
});
// ----------------- EMAIL MAKER
_SendGrid.makeEmailWithAttachment = (email, subject, html, attachment, fileName, fileType) => {
  return {
    to: email,
    from: _SendGrid.fromEmail,
    subject,
    text: subject,
    html,
    attachments: [
      {
        content: attachment,
        filename: fileName,
        type: `application/${fileType}`,
        disposition: "attachment"
      }
    ]
  };
};
// ----------------- EMAIL MAKER
_SendGrid.makeEmail = (email, subject, html) => {
  return {
    to: email,
    from: _SendGrid.fromEmail,
    subject,
    text: subject,
    html
  };
};
// ----------------- EMAIL MAKER
_SendGrid.makeEmails = (emails, subject, html) => {
  return {
    to: emails,
    from: _SendGrid.fromEmail,
    subject,
    text: subject,
    html
  };
};
var SendGrid = _SendGrid;

// src/index.ts
var EmailerEngine = class {
  constructor(service = SendGrid) {
    this.service = service;
    this.singleEmail = "chrisdevenv@gmail.com";
    this.smallBatch = [];
    this.largeBatch = [];
    ///* ----------------- SEND EMAIL ----------------- */
    /// -----------------------------------------------
    this.send = (sendType, template) => __async(this, null, function* () {
      try {
        switch (sendType) {
          case "many":
            const emails = this.smallBatch;
            yield this.service.sendSmallBatch(
              emails,
              template.subject,
              template.html
            );
            console.log("Emails sent");
            break;
          case "one":
            yield this.service.sendSingleEmail(
              this.singleEmail,
              template.subject,
              template.html
            );
            console.log("Email sent");
            break;
          case "all":
            try {
              yield this.service.sendLargeBatch(
                template.subject,
                template.html,
                this.largeBatch
              );
            } catch (err) {
              console.log("Error sending emails");
              console.log(err);
            }
            console.log("Emails sent");
            break;
          default:
            console.log("Invalid sendType");
            break;
        }
      } catch (err) {
        console.log(err);
        return err;
      }
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  EmailTemplates,
  EmailerEngine,
  SendGrid
});
//# sourceMappingURL=index.js.map