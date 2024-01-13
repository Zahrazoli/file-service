'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">file-service documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/DashboardModule.html" data-type="entity-link" >DashboardModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-DashboardModule-eaba470b6fbd6f4dcffb64d9daf03da831a191a8a6aaa8a4ea961773c3946d4001c69ff8fdb9f409b3ae9aaeaf944d15f72b84efa403e1384354cc16e6495a3d"' : 'data-bs-target="#xs-controllers-links-module-DashboardModule-eaba470b6fbd6f4dcffb64d9daf03da831a191a8a6aaa8a4ea961773c3946d4001c69ff8fdb9f409b3ae9aaeaf944d15f72b84efa403e1384354cc16e6495a3d"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-DashboardModule-eaba470b6fbd6f4dcffb64d9daf03da831a191a8a6aaa8a4ea961773c3946d4001c69ff8fdb9f409b3ae9aaeaf944d15f72b84efa403e1384354cc16e6495a3d"' :
                                            'id="xs-controllers-links-module-DashboardModule-eaba470b6fbd6f4dcffb64d9daf03da831a191a8a6aaa8a4ea961773c3946d4001c69ff8fdb9f409b3ae9aaeaf944d15f72b84efa403e1384354cc16e6495a3d"' }>
                                            <li class="link">
                                                <a href="controllers/DashboardController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DashboardController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-DashboardModule-eaba470b6fbd6f4dcffb64d9daf03da831a191a8a6aaa8a4ea961773c3946d4001c69ff8fdb9f409b3ae9aaeaf944d15f72b84efa403e1384354cc16e6495a3d"' : 'data-bs-target="#xs-injectables-links-module-DashboardModule-eaba470b6fbd6f4dcffb64d9daf03da831a191a8a6aaa8a4ea961773c3946d4001c69ff8fdb9f409b3ae9aaeaf944d15f72b84efa403e1384354cc16e6495a3d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-DashboardModule-eaba470b6fbd6f4dcffb64d9daf03da831a191a8a6aaa8a4ea961773c3946d4001c69ff8fdb9f409b3ae9aaeaf944d15f72b84efa403e1384354cc16e6495a3d"' :
                                        'id="xs-injectables-links-module-DashboardModule-eaba470b6fbd6f4dcffb64d9daf03da831a191a8a6aaa8a4ea961773c3946d4001c69ff8fdb9f409b3ae9aaeaf944d15f72b84efa403e1384354cc16e6495a3d"' }>
                                        <li class="link">
                                            <a href="injectables/DashboardService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DashboardService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/FileServiceModule.html" data-type="entity-link" >FileServiceModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-FileServiceModule-79bb07ad3a8c6d70d0d2cfe0a8e151b7527cbaf6a58603addfb2bfac936b496f6f56fcfee76a89458589251984ef795fb19b9898568fdaf41a1e70cb594d7d4d"' : 'data-bs-target="#xs-controllers-links-module-FileServiceModule-79bb07ad3a8c6d70d0d2cfe0a8e151b7527cbaf6a58603addfb2bfac936b496f6f56fcfee76a89458589251984ef795fb19b9898568fdaf41a1e70cb594d7d4d"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-FileServiceModule-79bb07ad3a8c6d70d0d2cfe0a8e151b7527cbaf6a58603addfb2bfac936b496f6f56fcfee76a89458589251984ef795fb19b9898568fdaf41a1e70cb594d7d4d"' :
                                            'id="xs-controllers-links-module-FileServiceModule-79bb07ad3a8c6d70d0d2cfe0a8e151b7527cbaf6a58603addfb2bfac936b496f6f56fcfee76a89458589251984ef795fb19b9898568fdaf41a1e70cb594d7d4d"' }>
                                            <li class="link">
                                                <a href="controllers/FileServiceController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FileServiceController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-FileServiceModule-79bb07ad3a8c6d70d0d2cfe0a8e151b7527cbaf6a58603addfb2bfac936b496f6f56fcfee76a89458589251984ef795fb19b9898568fdaf41a1e70cb594d7d4d"' : 'data-bs-target="#xs-injectables-links-module-FileServiceModule-79bb07ad3a8c6d70d0d2cfe0a8e151b7527cbaf6a58603addfb2bfac936b496f6f56fcfee76a89458589251984ef795fb19b9898568fdaf41a1e70cb594d7d4d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-FileServiceModule-79bb07ad3a8c6d70d0d2cfe0a8e151b7527cbaf6a58603addfb2bfac936b496f6f56fcfee76a89458589251984ef795fb19b9898568fdaf41a1e70cb594d7d4d"' :
                                        'id="xs-injectables-links-module-FileServiceModule-79bb07ad3a8c6d70d0d2cfe0a8e151b7527cbaf6a58603addfb2bfac936b496f6f56fcfee76a89458589251984ef795fb19b9898568fdaf41a1e70cb594d7d4d"' }>
                                        <li class="link">
                                            <a href="injectables/FileServiceService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FileServiceService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/S3Service.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >S3Service</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/OthersModule.html" data-type="entity-link" >OthersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-OthersModule-77669a36ee9046b6c45b7386d80d7b2f5bc2c646679358aca99df3e8a58530fa18f87be07345d26da93f6278e527bbe92d27fec05d6a362f76a42ebcc526a95b"' : 'data-bs-target="#xs-controllers-links-module-OthersModule-77669a36ee9046b6c45b7386d80d7b2f5bc2c646679358aca99df3e8a58530fa18f87be07345d26da93f6278e527bbe92d27fec05d6a362f76a42ebcc526a95b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-OthersModule-77669a36ee9046b6c45b7386d80d7b2f5bc2c646679358aca99df3e8a58530fa18f87be07345d26da93f6278e527bbe92d27fec05d6a362f76a42ebcc526a95b"' :
                                            'id="xs-controllers-links-module-OthersModule-77669a36ee9046b6c45b7386d80d7b2f5bc2c646679358aca99df3e8a58530fa18f87be07345d26da93f6278e527bbe92d27fec05d6a362f76a42ebcc526a95b"' }>
                                            <li class="link">
                                                <a href="controllers/OthersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OthersController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PaymentModule.html" data-type="entity-link" >PaymentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PaymentModule-0308890cad38cd9ef91b69b862b705402a8d5df3c0360930eb52da8f48002cf3d8e09b1fe1736058d7929b6a670913fdc4277660013dd1827742ee98233db6aa"' : 'data-bs-target="#xs-controllers-links-module-PaymentModule-0308890cad38cd9ef91b69b862b705402a8d5df3c0360930eb52da8f48002cf3d8e09b1fe1736058d7929b6a670913fdc4277660013dd1827742ee98233db6aa"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PaymentModule-0308890cad38cd9ef91b69b862b705402a8d5df3c0360930eb52da8f48002cf3d8e09b1fe1736058d7929b6a670913fdc4277660013dd1827742ee98233db6aa"' :
                                            'id="xs-controllers-links-module-PaymentModule-0308890cad38cd9ef91b69b862b705402a8d5df3c0360930eb52da8f48002cf3d8e09b1fe1736058d7929b6a670913fdc4277660013dd1827742ee98233db6aa"' }>
                                            <li class="link">
                                                <a href="controllers/PaymentController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PaymentController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PaymentModule-0308890cad38cd9ef91b69b862b705402a8d5df3c0360930eb52da8f48002cf3d8e09b1fe1736058d7929b6a670913fdc4277660013dd1827742ee98233db6aa"' : 'data-bs-target="#xs-injectables-links-module-PaymentModule-0308890cad38cd9ef91b69b862b705402a8d5df3c0360930eb52da8f48002cf3d8e09b1fe1736058d7929b6a670913fdc4277660013dd1827742ee98233db6aa"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PaymentModule-0308890cad38cd9ef91b69b862b705402a8d5df3c0360930eb52da8f48002cf3d8e09b1fe1736058d7929b6a670913fdc4277660013dd1827742ee98233db6aa"' :
                                        'id="xs-injectables-links-module-PaymentModule-0308890cad38cd9ef91b69b862b705402a8d5df3c0360930eb52da8f48002cf3d8e09b1fe1736058d7929b6a670913fdc4277660013dd1827742ee98233db6aa"' }>
                                        <li class="link">
                                            <a href="injectables/PaymentService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PaymentService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PlansModule.html" data-type="entity-link" >PlansModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PlansModule-bb70099d40a2a5555a614b79f5dfde9ab29030661badece64652013935f40dfc582983014d20acf08534e382f73e6dd5e2591907d40ca8189f0bf6bf16eb70b4"' : 'data-bs-target="#xs-controllers-links-module-PlansModule-bb70099d40a2a5555a614b79f5dfde9ab29030661badece64652013935f40dfc582983014d20acf08534e382f73e6dd5e2591907d40ca8189f0bf6bf16eb70b4"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PlansModule-bb70099d40a2a5555a614b79f5dfde9ab29030661badece64652013935f40dfc582983014d20acf08534e382f73e6dd5e2591907d40ca8189f0bf6bf16eb70b4"' :
                                            'id="xs-controllers-links-module-PlansModule-bb70099d40a2a5555a614b79f5dfde9ab29030661badece64652013935f40dfc582983014d20acf08534e382f73e6dd5e2591907d40ca8189f0bf6bf16eb70b4"' }>
                                            <li class="link">
                                                <a href="controllers/PlansController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PlansController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PlansModule-bb70099d40a2a5555a614b79f5dfde9ab29030661badece64652013935f40dfc582983014d20acf08534e382f73e6dd5e2591907d40ca8189f0bf6bf16eb70b4"' : 'data-bs-target="#xs-injectables-links-module-PlansModule-bb70099d40a2a5555a614b79f5dfde9ab29030661badece64652013935f40dfc582983014d20acf08534e382f73e6dd5e2591907d40ca8189f0bf6bf16eb70b4"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PlansModule-bb70099d40a2a5555a614b79f5dfde9ab29030661badece64652013935f40dfc582983014d20acf08534e382f73e6dd5e2591907d40ca8189f0bf6bf16eb70b4"' :
                                        'id="xs-injectables-links-module-PlansModule-bb70099d40a2a5555a614b79f5dfde9ab29030661badece64652013935f40dfc582983014d20acf08534e382f73e6dd5e2591907d40ca8189f0bf6bf16eb70b4"' }>
                                        <li class="link">
                                            <a href="injectables/PlansService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PlansService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link" >UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UserModule-984372cfed6a75705be4e80be315c730b92e7660930502b05798c2b9a46dc64585a1c9dcc7da6b971de649827d762f6d118115184b07176db7695ef45f375fdc"' : 'data-bs-target="#xs-controllers-links-module-UserModule-984372cfed6a75705be4e80be315c730b92e7660930502b05798c2b9a46dc64585a1c9dcc7da6b971de649827d762f6d118115184b07176db7695ef45f375fdc"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserModule-984372cfed6a75705be4e80be315c730b92e7660930502b05798c2b9a46dc64585a1c9dcc7da6b971de649827d762f6d118115184b07176db7695ef45f375fdc"' :
                                            'id="xs-controllers-links-module-UserModule-984372cfed6a75705be4e80be315c730b92e7660930502b05798c2b9a46dc64585a1c9dcc7da6b971de649827d762f6d118115184b07176db7695ef45f375fdc"' }>
                                            <li class="link">
                                                <a href="controllers/UserController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UserModule-984372cfed6a75705be4e80be315c730b92e7660930502b05798c2b9a46dc64585a1c9dcc7da6b971de649827d762f6d118115184b07176db7695ef45f375fdc"' : 'data-bs-target="#xs-injectables-links-module-UserModule-984372cfed6a75705be4e80be315c730b92e7660930502b05798c2b9a46dc64585a1c9dcc7da6b971de649827d762f6d118115184b07176db7695ef45f375fdc"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-984372cfed6a75705be4e80be315c730b92e7660930502b05798c2b9a46dc64585a1c9dcc7da6b971de649827d762f6d118115184b07176db7695ef45f375fdc"' :
                                        'id="xs-injectables-links-module-UserModule-984372cfed6a75705be4e80be315c730b92e7660930502b05798c2b9a46dc64585a1c9dcc7da6b971de649827d762f6d118115184b07176db7695ef45f375fdc"' }>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/V1Module.html" data-type="entity-link" >V1Module</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CallBackDTO.html" data-type="entity-link" >CallBackDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePlanDTO.html" data-type="entity-link" >CreatePlanDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/FileModel.html" data-type="entity-link" >FileModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/IsLoggedInException.html" data-type="entity-link" >IsLoggedInException</a>
                            </li>
                            <li class="link">
                                <a href="classes/IsLoggedInExceptionFilter.html" data-type="entity-link" >IsLoggedInExceptionFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginDTO.html" data-type="entity-link" >LoginDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/NotFoundExceptionFilter.html" data-type="entity-link" >NotFoundExceptionFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/OrderModel.html" data-type="entity-link" >OrderModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/ServicePlansModel.html" data-type="entity-link" >ServicePlansModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/SignupDTO.html" data-type="entity-link" >SignupDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/UnAuthenticatedException.html" data-type="entity-link" >UnAuthenticatedException</a>
                            </li>
                            <li class="link">
                                <a href="classes/UnAuthenticatedExceptionFilter.html" data-type="entity-link" >UnAuthenticatedExceptionFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserCreateDTO.html" data-type="entity-link" >UserCreateDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserModel.html" data-type="entity-link" >UserModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/UsersPlanModel.html" data-type="entity-link" >UsersPlanModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserUpdateDTO.html" data-type="entity-link" >UserUpdateDTO</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthenticateGuard.html" data-type="entity-link" >AuthenticateGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/IsLoggedInGuard.html" data-type="entity-link" >IsLoggedInGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Request.html" data-type="entity-link" >Request</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});