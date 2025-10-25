---
layout: page
title: SLAP - Shortcut Learning for Abstract Planning
description: Learning physical improvisations to enhance task and motion planners
img: assets/img/7.jpg
importance: 3
category: research
related_publications: true
---

**Princeton PRPL Lab** | September 2024 - May 2025
**Advisors:** Professor Tom Silver and Professor Benjamin Eysenbach

## Overview

SLAP (Shortcut Learning for Abstract Planning) is a generic algorithm that automatically improves existing task and motion planners (TAMPs) by discovering new physical improvisations through model-free reinforcement learning. The key innovation is learning non-obvious physical behaviors that achieve tasks faster or handle more complex scenarios than traditional symbolic planning alone.

## Key Contributions

- **Generic TAMP Enhancement:** Designed an algorithm that works with any existing TAMP system, automatically discovering physical "shortcuts" that improve execution time and robustness.

- **Model-Free Discovery:** Uses reinforcement learning to discover physical improvisations without requiring explicit physical models, enabling adaptation to complex dynamics and multi-object interactions.

- **Extensive Evaluation:** Conducted experiments across four PyBullet environments and one custom 2D TAMP environment, demonstrating consistent improvements over baseline planners.

- **Robustness Analysis:** Investigated SLAP's performance in challenging scenarios that violate standard TAMP assumptions, including stochasticity, partial observability, and continuous goal specifications.

## Technical Approach

The method combines symbolic task planning with learned low-level policies that can execute "improvised" actions—physical behaviors that accomplish goals through dynamics exploitation rather than purely symbolic reasoning. For example, learning to push multiple objects simultaneously or using momentum to overcome obstacles.

## Impact

This work bridges the gap between classical symbolic planning and modern learning-based approaches, showing how they can be combined synergistically. The automatic discovery of physical improvisations enables robots to be more efficient and adaptive in real-world scenarios.

**Status:** Under review for ICLR 2026
