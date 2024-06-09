const {targetsMissed, targetTokens, sourceToken} = game.modules.get("lancer-weapon-fx").api.getMacroVariables(this);

let sequence = new Sequence();

for (const target of targetTokens) {
    sequence.effect()
        .file("jb2a.warhammer.melee.01.white.4")
        .atLocation(sourceToken)
        .spriteOffset({x: -0.3}, {gridUnits:true})
        .moveTowards(target)
        .missed(targetsMissed.has(target.id))
        .waitUntilFinished(-1400);
    sequence.sound()
        .file("modules/lancer-weapon-fx/soundfx/Axe_swing.ogg")
        .volume(game.modules.get("lancer-weapon-fx").api.getEffectVolume(0.7))
        .waitUntilFinished(-1800);
    if (!targetsMissed.has(target.id)) {
        sequence.sound()
            .file("modules/lancer-weapon-fx/soundfx/HammerImpact.ogg")
            .volume(game.modules.get("lancer-weapon-fx").api.getEffectVolume(0.9));
        sequence.effect()
            .file("jb2a.impact.ground_crack.orange")
            .atLocation(target)
            .belowTokens()
            .scaleToObject(3)
            .waitUntilFinished(-6000);
    }
}
sequence.play();
