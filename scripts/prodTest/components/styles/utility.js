"use strict";

(function () {
    var $ = Breinify.UTL._jquery();

    var style = `<style>
        .align-baseline {
            vertical-align: baseline !important;
        }
        .align-top {
            vertical-align: top !important;
        }
        .align-middle {
            vertical-align: middle !important;
        }
        .align-bottom {
            vertical-align: bottom !important;
        }
        .align-text-bottom {
            vertical-align: text-bottom !important;
        }
        .align-text-top {
            vertical-align: text-top !important;
        }
        .float-start {
            float: left !important;
        }
        .float-end {
            float: right !important;
        }
        .float-none {
            float: none !important;
        }
        .overflow-auto {
            overflow: auto !important;
        }
        .overflow-hidden {
            overflow: hidden !important;
        }
        .overflow-visible {
            overflow: visible !important;
        }
        .overflow-scroll {
            overflow: scroll !important;
        }
        .d-inline {
            display: inline !important;
        }
        .d-inline-block {
            display: inline-block !important;
        }
        .d-block {
            display: block !important;
        }
        .d-grid {
            display: grid !important;
        }
        .d-table {
            display: table !important;
        }
        .d-table-row {
            display: table-row !important;
        }
        .d-table-cell {
            display: table-cell !important;
        }
        .d-flex {
            display: flex !important;
        }
        .d-inline-flex {
            display: inline-flex !important;
        }
        .d-none {
            display: none !important;
        }
        .shadow {
            box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
        }
        .shadow-sm {
            box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
        }
        .shadow-lg {
            box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175) !important;
        }
        .shadow-none {
            box-shadow: none !important;
        }
        .position-static {
            position: static !important;
        }
        .position-relative {
            position: relative !important;
        }
        .position-absolute {
            position: absolute !important;
        }
        .position-fixed {
            position: fixed !important;
        }
        .position-sticky {
            position: -webkit-sticky !important;
            position: sticky !important;
        }
        .top-0 {
            top: 0 !important;
        }
        .top-50 {
            top: 50% !important;
        }
        .top-100 {
            top: 100% !important;
        }
        .bottom-0 {
            bottom: 0 !important;
        }
        .bottom-50 {
            bottom: 50% !important;
        }
        .bottom-100 {
            bottom: 100% !important;
        }
        .start-0 {
            left: 0 !important;
        }
        .start-50 {
            left: 50% !important;
        }
        .start-100 {
            left: 100% !important;
        }
        .end-0 {
            right: 0 !important;
        }
        .end-50 {
            right: 50% !important;
        }
        .end-100 {
            right: 100% !important;
        }
        .translate-middle {
            transform: translate(-50%, -50%) !important;
        }
        .translate-middle-x {
            transform: translateX(-50%) !important;
        }
        .translate-middle-y {
            transform: translateY(-50%) !important;
        }
        .border {
            border: 1px solid #dee2e6 !important;
        }
        .border-0 {
            border: 0 !important;
        }
        .border-top {
            border-top: 1px solid #dee2e6 !important;
        }
        .border-top-0 {
            border-top: 0 !important;
        }
        .border-end {
            border-right: 1px solid #dee2e6 !important;
        }
        .border-end-0 {
            border-right: 0 !important;
        }
        .border-bottom {
            border-bottom: 1px solid #dee2e6 !important;
        }
        .border-bottom-0 {
            border-bottom: 0 !important;
        }
        .border-start {
            border-left: 1px solid #dee2e6 !important;
        }
        .border-start-0 {
            border-left: 0 !important;
        }
        .border-primary {
            border-color: #0d6efd !important;
        }
        .border-secondary {
            border-color: #6c757d !important;
        }
        .border-success {
            border-color: #198754 !important;
        }
        .border-info {
            border-color: #0dcaf0 !important;
        }
        .border-warning {
            border-color: #ffc107 !important;
        }
        .border-danger {
            border-color: #dc3545 !important;
        }
        .border-light {
            border-color: #f8f9fa !important;
        }
        .border-dark {
            border-color: #212529 !important;
        }
        .border-white {
            border-color: #fff !important;
        }
        .border-1 {
            border-width: 1px !important;
        }
        .border-2 {
            border-width: 2px !important;
        }
        .border-3 {
            border-width: 3px !important;
        }
        .border-4 {
            border-width: 4px !important;
        }
        .border-5 {
            border-width: 5px !important;
        }
        .w-25 {
            width: 25% !important;
        }
        .w-50 {
            width: 50% !important;
        }
        .w-75 {
            width: 75% !important;
        }
        .w-100 {
            width: 100% !important;
        }
        .w-auto {
            width: auto !important;
        }
        .mw-100 {
            max-width: 100% !important;
        }
        .vw-100 {
            width: 100vw !important;
        }
        .min-vw-100 {
            min-width: 100vw !important;
        }
        .h-25 {
            height: 25% !important;
        }
        .h-50 {
            height: 50% !important;
        }
        .h-75 {
            height: 75% !important;
        }
        .h-100 {
            height: 100% !important;
        }
        .h-auto {
            height: auto !important;
        }
        .mh-100 {
            max-height: 100% !important;
        }
        .vh-100 {
            height: 100vh !important;
        }
        .min-vh-100 {
            min-height: 100vh !important;
        }
        .flex-fill {
            flex: 1 1 auto !important;
        }
        .flex-row {
            flex-direction: row !important;
        }
        .flex-column {
            flex-direction: column !important;
        }
        .flex-row-reverse {
            flex-direction: row-reverse !important;
        }
        .flex-column-reverse {
            flex-direction: column-reverse !important;
        }
        .flex-grow-0 {
            flex-grow: 0 !important;
        }
        .flex-grow-1 {
            flex-grow: 1 !important;
        }
        .flex-shrink-0 {
            flex-shrink: 0 !important;
        }
        .flex-shrink-1 {
            flex-shrink: 1 !important;
        }
        .flex-wrap {
            flex-wrap: wrap !important;
        }
        .flex-nowrap {
            flex-wrap: nowrap !important;
        }
        .flex-wrap-reverse {
            flex-wrap: wrap-reverse !important;
        }
        .gap-0 {
            gap: 0 !important;
        }
        .gap-1 {
            gap: 0.25rem !important;
        }
        .gap-2 {
            gap: 0.5rem !important;
        }
        .gap-3 {
            gap: 1rem !important;
        }
        .gap-4 {
            gap: 1.5rem !important;
        }
        .gap-5 {
            gap: 3rem !important;
        }
        .justify-content-start {
            justify-content: flex-start !important;
        }
        .justify-content-end {
            justify-content: flex-end !important;
        }
        .justify-content-center {
            justify-content: center !important;
        }
        .justify-content-between {
            justify-content: space-between !important;
        }
        .justify-content-around {
            justify-content: space-around !important;
        }
        .justify-content-evenly {
            justify-content: space-evenly !important;
        }
        .align-items-start {
            align-items: flex-start !important;
        }
        .align-items-end {
            align-items: flex-end !important;
        }
        .align-items-center {
            align-items: center !important;
        }
        .align-items-baseline {
            align-items: baseline !important;
        }
        .align-items-stretch {
            align-items: stretch !important;
        }
        .align-content-start {
            align-content: flex-start !important;
        }
        .align-content-end {
            align-content: flex-end !important;
        }
        .align-content-center {
            align-content: center !important;
        }
        .align-content-between {
            align-content: space-between !important;
        }
        .align-content-around {
            align-content: space-around !important;
        }
        .align-content-stretch {
            align-content: stretch !important;
        }
        .align-self-auto {
            align-self: auto !important;
        }
        .align-self-start {
            align-self: flex-start !important;
        }
        .align-self-end {
            align-self: flex-end !important;
        }
        .align-self-center {
            align-self: center !important;
        }
        .align-self-baseline {
            align-self: baseline !important;
        }
        .align-self-stretch {
            align-self: stretch !important;
        }
        .order-first {
            order: -1 !important;
        }
        .order-0 {
            order: 0 !important;
        }
        .order-1 {
            order: 1 !important;
        }
        .order-2 {
            order: 2 !important;
        }
        .order-3 {
            order: 3 !important;
        }
        .order-4 {
            order: 4 !important;
        }
        .order-5 {
            order: 5 !important;
        }
        .order-last {
            order: 6 !important;
        }
        .fixed-top {
            position: fixed;
            top: 0;
            right: 0;
            left: 0;
            z-index: 1030;
        }
        .fixed-bottom {
            position: fixed;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: 1030;
        }
        .sticky-top {
            position: -webkit-sticky;
            position: sticky;
            top: 0;
            z-index: 1020;
        }
    </style>`;

    $('head').append(style);
})();