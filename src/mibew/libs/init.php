<?php
/*
 * Copyright 2005-2013 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * File system root directory of the Mibew installations
 */
define('MIBEW_FS_ROOT', dirname(dirname(__FILE__)));

// Prevent Mibew from access to files outside the installation
@ini_set('open_basedir', MIBEW_FS_ROOT);

// Include configuration file
require_once(MIBEW_FS_ROOT . '/libs/config.php');

// Sanitize path to application and remove extra slashes
$mibewroot = join(
    "/",
    array_map(
        "urlencode",
        preg_split('/\//', preg_replace('/\/+$/', '', preg_replace('/\/{2,}/', '/', '/' . $mibewroot)))
    )
);

/**
 * Base URL of the Mibew installation
 */
define('MIBEW_WEB_ROOT', $mibewroot);

// Include system constants file
require_once(MIBEW_FS_ROOT . '/libs/common/constants.php');

// Initialize classes autoloading
require_once(MIBEW_FS_ROOT . '/libs/common/autoload.php');
spl_autoload_register('class_autoload');

// Initialize external dependencies
require_once(MIBEW_FS_ROOT . '/vendor/autoload.php');

// Include common libs
require_once(MIBEW_FS_ROOT . '/libs/common/configurations.php');
require_once(MIBEW_FS_ROOT . '/libs/common/verification.php');
require_once(MIBEW_FS_ROOT . '/libs/common/converter.php');
require_once(MIBEW_FS_ROOT . '/libs/common/locale.php');
require_once(MIBEW_FS_ROOT . '/libs/common/csrf.php');
require_once(MIBEW_FS_ROOT . '/libs/common/datetime.php');
require_once(MIBEW_FS_ROOT . '/libs/common/forms.php');
require_once(MIBEW_FS_ROOT . '/libs/common/misc.php');
require_once(MIBEW_FS_ROOT . '/libs/common/request.php');
require_once(MIBEW_FS_ROOT . '/libs/common/response.php');
require_once(MIBEW_FS_ROOT . '/libs/common/string.php');

// Make session cookie more secure
@ini_set('session.cookie_httponly', true);
if (is_secure_request()) {
    @ini_set('session.cookie_secure', true);
}
@ini_set('session.cookie_path', MIBEW_WEB_ROOT . "/");
@ini_set('session.name', 'MibewSessionID');

// Initialize user session
session_start();

// Initialize the database
\Mibew\Database::initialize(
    $mysqlhost,
    $mysqllogin,
    $mysqlpass,
    $use_persistent_connection,
    $mysqldb,
    $mysqlprefix,
    $force_charset_in_connection,
    $dbencoding
);

if (function_exists("date_default_timezone_set")) {
    // TODO try to get timezone from config.php/session etc.
    // autodetect timezone
    @date_default_timezone_set(function_exists("date_default_timezone_get") ? @date_default_timezone_get() : "GMT");
}

if (!empty($plugins_list)) {
    // Variable $plugins_config defined in libs/config.php
    \Mibew\PluginManager::loadPlugins($plugins_list);
}
