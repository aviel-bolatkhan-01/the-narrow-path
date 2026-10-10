# Design Spec: The Narrow Path (Christian Deck-builder)
**Date:** 2026-10-10
**Status:** Draft / Pending User Review

## 1. Vision
A high-fidelity, roguelike deck-builder mirroring the depth of *Slay the Spire 2*, designed as a spiritual odyssey. The game uses an "Illuminated Manuscript" aesthetic where gameplay and theme are deeply integrated.

## 2. Core Gameplay Mechanics

### 2.1 Resource System: The Faith Ramp
Unlike standard energy-only systems, "The Narrow Path" uses a dual-resource loop.
- **Energy:** Small amount per turn (e.g., 3) for basic actions.
- **Faith Meter (0-100):** A secondary, accumulating resource.
- **The Loop:**
    - **Prayer/Worship Cards:** Cost Energy $\rightarrow$ Add Faith.
    - **Miracle Cards:** Cost 0 Energy $\rightarrow$ Require Faith Threshold (e.g., 50+). Consumes Faith upon use.
    - **Tension:** Balancing early-game vulnerability (building Faith) with late-game dominance (casting Miracles).

### 2.2 Card Archetypes
- **Prayer (Blue/Silver):** Faith generators.
- **Defense (White/Gold):** Mitigation, blocking, and "patient endurance."
- **Miracles (Bright Gold/Glowing):** High-impact, high-cost Faith effects (e.g., massive damage, full heals).
- **Truths (Purple/Deep Blue):** Strategic cards that complete "Verses" to unlock permanent combat buffs.

## 3. World Structure (The Narrow Path)

### 3.1 The Map
A branching path from "The Call" to "The Eternal City."
- **Trial Nodes:** Combat against spiritual manifestations (e.g., The Spirit of Sloth).
- **Sabbath Nodes:** Recovery points. Options: *Rest* (Heal HP) or *Purify* (Remove Doubt/Junk cards).
- **Prophet Nodes:** Trading "Grace" for new cards or Divine Artifacts.
- **Parable Nodes:** Narrative events where choices determine the reward.

### 3.2 Progression & Eternal Truths
The world is divided into **Parable Zones**. 
- Each Zone ends with a **Guardian of the Gate** boss.
- Defeating a Guardian unlocks an **Eternal Truth** (Permanent Passive).
- *Example:* "The Lord is my Shepherd" $\rightarrow$ Every Prayer card played heals 2 HP.

## 4. "The Living Scroll" (Visuals & Audio)

### 4.1 Visual Identity
- **Style:** Illuminated Manuscript / Ancient Parchment.
- **Background:** Dynamic parchment shader with "living" edges.
- **Ink & Gold System:**
    - Cards "bleed" into the screen like ink on wet paper.
    - Miracles trigger "Gold Leaf" ripples across the UI.
    - Enemies are semi-abstract ink-wash calligraphy.
- **Transitions:** Camera pans across an unfolding scroll.

### 4.2 Audio Identity
- **Dynamic Soundscape:**
    - Low Faith $\rightarrow$ Sparse atmosphere (wind, harp).
    - High Faith $\rightarrow$ Layered choral harmonies and orchestral strings.
- **Key SFX:**
    - Quill on parchment (Card play).
    - Resonant bells and shimmers (Miracles).
    - Tearing parchment (Damage).

## 5. Implementation Strategy
The project will be developed in the following sequence:
1. **Core Combat Engine:** Faith/Energy logic and state management.
2. **Deck & Card System:** Drafting, junk removal, and scaling.
3. **Living Scroll Layer:** WebGL/Canvas shaders for ink/gold effects.
4. **World Map:** Node-based navigation and Parable event system.
5. **Audio Layer:** Dynamic music mixer based on Faith state.
