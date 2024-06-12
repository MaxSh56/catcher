import { onDocReady } from "./misc";
import { CatcherApp } from "./catcher";
import { CatcherAssets } from "./catcher/core/catcher.assets";
import { Vector2, MinMax } from "./math";
import { EntitiesManagerInitConfig } from "./catcher/managers/entities.manager/lib";
import { CollectAreaInitConfig } from "./catcher/collect.area/lib";
import { PlayerInitConfig } from "./catcher/entities/lib";
import * as PIXI from "pixi.js";
import WebFont from "webfontloader";
import { CatcherAppConfig } from "./catcher/core/lib";
import { ScorePointsCounterInitConfig} from "./catcher/ui/score.points.counter/lib";
import {BackgroundInitConfig} from "./catcher/background/lib";
import { LivesCounterInitConfig } from "./catcher/ui/lives.counter/lib";
import {LoseScreenInitConfig} from "./catcher/ui/lose.screen/lib";
import {HurtScreenInitConfig} from "./catcher/ui/hurt.screen/lib";

(async (): Promise<void> => {

    const animalsTextures: PIXI.Texture[] = [
        CatcherAssets.Animal0Texture,
        CatcherAssets.Animal1Texture,
        CatcherAssets.Animal2Texture,
    ];

    const playerInitConfig: PlayerInitConfig = {
        initPosition: new Vector2(0, -100),
        speed: 0.05,
        texture: CatcherAssets.PlayerTexture,
        autoBorn: true,
        catchDistance: 100,
        followPositionOffset: new Vector2(50, 50),
        maxFollowers: 5,
        doPatrol: false,
        respawnAble: false,
        followAble: false,
    };

    const entitiesManagerInitConfig: EntitiesManagerInitConfig = {
        poolInitData: {
            animals: 15,
            poisonDemons: 3,
        },
        animalInitConfig: {
            speed: 0.05,
            autoBorn: true,
            initPosition: Vector2.zero,
            texture: CatcherAssets.Animal0Texture,
            textures: animalsTextures,
            cost: 2,
            beholdShift: new Vector2(10, 20),
            catchedTexture: CatcherAssets.AnimalCatchedTexture,
            followAble: true,
            doPatrol: true,
            patrolDelayRange: new MinMax(1e3, 5e3),
            patrolStepMaxDistance: 100,
            respawnAble: true,
            respawnDelayRange: new MinMax(2e3, 3e3),
        },
        poisonDemonInitConfig: {
            speed: 0.075,
            autoBorn: true,
            initPosition: Vector2.zero,
            texture: CatcherAssets.PoisonDemonTexture,
            cost: 0,
            beholdShift: new Vector2(10, 20),
            followAble: true,
            doPatrol: true,
            catchedTexture: CatcherAssets.PoisonDemonCatchedTexture,
            patrolDelayRange: new MinMax(250, 750),
            patrolStepMaxDistance: 200,
            respawnAble: true,
            respawnDelayRange: new MinMax(1e4, 12e3),
        }
    };

    const collectAreaInitConfig: CollectAreaInitConfig = {
        texture: CatcherAssets.CollectAreaTexture,
        initPosition: Vector2.zero,
        catchDistance: 100,
    };

    const backgroundInitConfig: BackgroundInitConfig = {
        texture: CatcherAssets.BackgroundTexture,
        initPosition: new Vector2(0, 0),
    };

    const scorePointsCounterInitConfig: ScorePointsCounterInitConfig = {
        styles: {
            dropShadow: false,
            strokeThickness: 8,
            stroke: "#100e36",
            fill: "#ff9900",
            fontWeight: "bold",
            fontSize: 62,
            fontFamily: "Eagle Lake"
        },
        initPosition: new Vector2(335, -350),
        defaultText: "0"
    };

    const livesCounterInitConfig: LivesCounterInitConfig = {
        initPosition:  new Vector2(-335, -350),
        texture: CatcherAssets.HeartTexture,
        offset: 75,
    };

    const loseScreenInitConfig: LoseScreenInitConfig = {
        initPosition: Vector2.zero,
        restartButtonInitConfig: {
            initPosition: new Vector2(0, 190),
            texture: CatcherAssets.ButtonRestartTexture,
            hoverTexture: CatcherAssets.ButtonRestartHoverTexture,
        },
    };

    const hurtScreenInitConfig: HurtScreenInitConfig = {
        initPosition: Vector2.zero,
    };

    const catcherAppConfig: CatcherAppConfig = {
        parentElement: document.querySelector('.application-wrapper'),
        playerInitConfig,
        entitiesManagerInitConfig,
        collectAreaInitConfig,
        scorePointsCounterInitConfig,
        backgroundInitConfig,
        livesCounterInitConfig,
        loseScreenInitConfig,
        hurtScreenInitConfig,
    };

    const onLoadFont = (): void => CatcherApp
        .getSingle()
        .init(catcherAppConfig);


    await onDocReady();

    WebFont.load({
        google: { families: ["Eagle Lake"] },
        active: onLoadFont,
    });
})();