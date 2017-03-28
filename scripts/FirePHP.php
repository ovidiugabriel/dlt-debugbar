<?php 

// Loaded using `composer`
require __DIR__ . '/vendor/autoload.php';

use DebugBar\StandardDebugBar;
use DebugBar\DataCollector\ExceptionsCollector;

class FirePHP {
    private $debugbar;
    private $debugbarRenderer;
    private $messages;
    private $enabled;

    private function __construct() {
        $this->debugbar = new StandardDebugBar();
        $this->debugbarRenderer = $this->debugbar->getJavascriptRenderer();
        $this->messages = $this->debugbar['messages'];
        $this->enabled = true;
    }

    static public function getInstance() {
        static $instance = null;
        if (null == $instance) {
            $instance = new self();
        }
        return $instance;
    }

    public function log($msg) {
        if ($this->enabled) {$this->messages->log($msg);}
    }

    public function debug($msg) {
        if ($this->enabled) {$this->messages->debug($msg);}
    }

    public function info($msg) {
        if ($this->enabled) {$this->messages->info($msg);}
    }

    public function warn($msg) {
        if ($this->enabled) {$this->messages->warning($msg);}
    }

    public function error($msg) {
        if ($this->enabled) {$this->messages->error($msg);}
    }

    public function setEnabled($enabled) {
        $this->enabled = $enabled;
    }

    public function renderHead() {
        if (! $this->enabled) {return null;}
        $style = "<style type=\"text/css\">
            .phpdebugbar-widgets-toolbar {
                display: none;
            }
        </style>";
        return ( $style . $this->debugbarRenderer->renderHead() );
    }

    public function render() {
        if ($this->enabled) {return $this->debugbarRenderer->render();}
    }
}

function firephp($enabled = true) {
    $inst = FirePHP::getInstance();
    $inst->setEnabled($enabled);
    return $inst;
}
