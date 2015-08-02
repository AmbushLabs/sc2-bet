package com.gosuwager

class AuthController {

    BattleNetAuthService battleNetAuthService;
    BattleNetApiService battleNetApiService;

    def index() { }

    def bnet_start_auth() {
        redirect(url:battleNetAuthService.getAuthUrl());
    }

    def battlenet() {
        if (params.code) {
            def bnetToken = battleNetAuthService.getBattleNetAccessToken(params.code);
            def character = battleNetApiService.getCharacterForToken(bnetToken);
            render 'dope'
        } else {
            render 'hi';
        }
    }
}
