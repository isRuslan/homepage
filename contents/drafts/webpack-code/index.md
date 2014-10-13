---
title: Как устроен Webpack: смотрим исходники
date: 2012-13-10 15:00
template: article.jade
---
[](http://webpack.github.io/assets/logo.png)

[Webpack](http://webpack.github.io/docs/) - это, стремительно набирающий популярность, сборщик модулей. Он прост в обращении, предоставляет большие возможности для организации кода, объединяет уже существующие подходы модулирования приложений и дополняет их. В статье мы не будем аргументировать зачем и когда использовать webpack, подразумевается, что читатель уже знаком с проектом и надобности мотивировать его нет. Мы же попытаемся заглянуть внутрь и понять как это работает с помощью разбора примеров из документации.

======== кат

## Getting Started

Проект оформлен в виде [организации](https://github.com/webpack/) на гитхабе:
- основной проект https://github.com/webpack/webpack
- [загрузчики](http://webpack.github.io/docs/loaders.html) - например https://github.com/webpack/jade-loader
- [плагины](http://webpack.github.io/docs/plugins.html) - например https://github.com/webpack/component-webpack-plugin
- лендинг https://github.com/webpack/webpack.github.com
- документация https://github.com/webpack/docs
- ...

## Core
Структура проекта:
```sh
	├── LICENSE
	├── README.md
	├── appveyor.yml
	├── bin
	│   ├── config-optimist.js
	│   ├── convert-argv.js
	│   └── webpack.js
	├── bm.js
	├── buildin
	│   ├── amd-define.js
	│   ├── amd-options.js
	│   ├── module.js
	│   └── return-require.js
	├── examples
	│   ├ ... # примеры 38 папок, 224 файла
	├── hot
	│   ├── dev-server.js
	│   ├── only-dev-server.js
	│   └── poll.js
	├── lib
	│   ├── APIPlugin.js
	│   ├── AbstractPlugin.js
	│   ├── AmdMainTemplatePlugin.js
	│   ├── ArrayMap.js
	│   ├── AsyncDependenciesBlock.js
	│   ├── BannerPlugin.js
	│   ├── BasicEvaluatedExpression.js
	│   ├── CachePlugin.js
	│   ├── CaseSensitiveModulesWarning.js
	│   ├── Chunk.js
	│   ├── ChunkTemplate.js
	│   ├── CompatibilityPlugin.js
	│   ├── Compilation.js
	│   ├── Compiler.js
	│   ├── ConcatSource.js
	│   ├── ConstPlugin.js
	│   ├── ContextModule.js
	│   ├── ContextModuleFactory.js
	│   ├── ContextReplacementPlugin.js
	│   ├── CriticalDependenciesWarning.js
	│   ├── DefinePlugin.js
	│   ├── DependenciesBlock.js
	│   ├── DependenciesBlockVariable.js
	│   ├── Dependency.js
	│   ├── EntryModuleNotFoundError.js
	│   ├── EvalDevToolModulePlugin.js
	│   ├── EvalDevToolModuleTemplatePlugin.js
	│   ├── EvalSourceMapDevToolModuleTemplatePlugin.js
	│   ├── EvalSourceMapDevToolPlugin.js
	│   ├── ExtendedAPIPlugin.js
	│   ├── ExternalModule.js
	│   ├── ExternalModuleFactoryDecorator.js
	│   ├── ExternalsPlugin.js
	│   ├── FunctionModulePlugin.js
	│   ├── FunctionModuleTemplatePlugin.js
	│   ├── HotModuleReplacementPlugin.js
	│   ├── HotUpdateChunkTemplate.js
	│   ├── IgnorePlugin.js
	│   ├── JsonpChunkTemplatePlugin.js
	│   ├── JsonpExportMainTemplatePlugin.js
	│   ├── JsonpHotUpdateChunkTemplatePlugin.js
	│   ├── JsonpMainTemplatePlugin.js
	│   ├── JsonpTemplatePlugin.js
	│   ├── LibraryTemplatePlugin.js
	│   ├── LoaderTargetPlugin.js
	│   ├── MainTemplate.js
	│   ├── MemoryOutputFileSystem.js
	│   ├── Module.js
	│   ├── ModuleFilenameHelpers.js
	│   ├── ModuleNotFoundError.js
	│   ├── ModuleParseError.js
	│   ├── ModuleParserHelpers.js
	│   ├── ModuleReason.js
	│   ├── ModuleTemplate.js
	│   ├── MovedToPluginWarningPlugin.js
	│   ├── MultiCompiler.js
	│   ├── MultiEntryPlugin.js
	│   ├── MultiModule.js
	│   ├── MultiModuleFactory.js
	│   ├── NewWatchingPlugin.js
	│   ├── NoErrorsPlugin.js
	│   ├── NodeStuffPlugin.js
	│   ├── NormalModule.js
	│   ├── NormalModuleFactory.js
	│   ├── NormalModuleReplacementPlugin.js
	│   ├── NullFactory.js
	│   ├── OptionsApply.js
	│   ├── OriginalSource.js
	│   ├── Parser.js
	│   ├── PrefetchPlugin.js
	│   ├── ProgressPlugin.js
	│   ├── ProvidePlugin.js
	│   ├── RawModule.js
	│   ├── RawSource.js
	│   ├── RecordIdsPlugin.js
	│   ├── RequestShortener.js
	│   ├── RequireJsStuffPlugin.js
	│   ├── ResolverPlugin.js
	│   ├── SetVarMainTemplatePlugin.js
	│   ├── SingleEntryPlugin.js
	│   ├── Source.js
	│   ├── SourceMapDevToolPlugin.js
	│   ├── SourceMapSource.js
	│   ├── Stats.js
	│   ├── Template.js
	│   ├── TemplatedPathPlugin.js
	│   ├── UmdMainTemplatePlugin.js
	│   ├── UnsupportedFeatureWarning.js
	│   ├── WarnCaseSensitiveModulesPlugin.js
	│   ├── WebpackOptionsApply.js
	│   ├── WebpackOptionsDefaulter.js
	│   ├── dependencies
	│   │   ├── AMDDefineDependency.js
	│   │   ├── AMDDefineDependencyParserPlugin.js
	│   │   ├── AMDPlugin.js
	│   │   ├── AMDRequireArrayDependency.js
	│   │   ├── AMDRequireContextDependency.js
	│   │   ├── AMDRequireDependenciesBlock.js
	│   │   ├── AMDRequireDependenciesBlockParserPlugin.js
	│   │   ├── AMDRequireDependency.js
	│   │   ├── AMDRequireItemDependency.js
	│   │   ├── CommonJsPlugin.js
	│   │   ├── CommonJsRequireContextDependency.js
	│   │   ├── CommonJsRequireDependency.js
	│   │   ├── CommonJsRequireDependencyParserPlugin.js
	│   │   ├── ConstDependency.js
	│   │   ├── ContextDependency.js
	│   │   ├── ContextDependencyHelpers.js
	│   │   ├── ContextDependencyTemplateAsId.js
	│   │   ├── ContextDependencyTemplateAsRequireCall.js
	│   │   ├── ContextElementDependency.js
	│   │   ├── LabeledExportsDependency.js
	│   │   ├── LabeledModuleDependency.js
	│   │   ├── LabeledModuleDependencyParserPlugin.js
	│   │   ├── LabeledModulesPlugin.js
	│   │   ├── LoaderDependency.js
	│   │   ├── LoaderPlugin.js
	│   │   ├── LocalModule.js
	│   │   ├── LocalModuleDependency.js
	│   │   ├── LocalModulesHelpers.js
	│   │   ├── ModuleDependency.js
	│   │   ├── ModuleDependencyTemplateAsId.js
	│   │   ├── ModuleDependencyTemplateAsRequireId.js
	│   │   ├── ModuleHotAcceptDependency.js
	│   │   ├── ModuleHotDeclineDependency.js
	│   │   ├── MultiEntryDependency.js
	│   │   ├── NullDependency.js
	│   │   ├── NullDependencyTemplate.js
	│   │   ├── PrefetchDependency.js
	│   │   ├── RequireContextDependency.js
	│   │   ├── RequireContextDependencyParserPlugin.js
	│   │   ├── RequireContextPlugin.js
	│   │   ├── RequireEnsureDependenciesBlock.js
	│   │   ├── RequireEnsureDependenciesBlockParserPlugin.js
	│   │   ├── RequireEnsureDependency.js
	│   │   ├── RequireEnsureItemDependency.js
	│   │   ├── RequireEnsurePlugin.js
	│   │   ├── RequireHeaderDependency.js
	│   │   ├── RequireIncludeDependency.js
	│   │   ├── RequireIncludeDependencyParserPlugin.js
	│   │   ├── RequireIncludePlugin.js
	│   │   ├── RequireResolveContextDependency.js
	│   │   ├── RequireResolveDependency.js
	│   │   ├── RequireResolveDependencyParserPlugin.js
	│   │   ├── RequireResolveHeaderDependency.js
	│   │   ├── SingleEntryDependency.js
	│   │   ├── TemplateArgumentDependency.js
	│   │   ├── WebpackMissingModule.js
	│   │   └── getFunctionExpression.js
	│   ├── node
	│   │   ├── NodeChunkTemplatePlugin.js
	│   │   ├── NodeEnvironmentPlugin.js
	│   │   ├── NodeHotUpdateChunkTemplatePlugin.js
	│   │   ├── NodeMainTemplatePlugin.js
	│   │   ├── NodeOutputFileSystem.js
	│   │   ├── NodeSourcePlugin.js
	│   │   ├── NodeTargetPlugin.js
	│   │   ├── NodeTemplatePlugin.js
	│   │   └── NodeWatchFileSystem.js
	│   ├── optimize
	│   │   ├── AggressiveMergingPlugin.js
	│   │   ├── CommonsChunkPlugin.js
	│   │   ├── DedupePlugin.js
	│   │   ├── FlagIncludedChunksPlugin.js
	│   │   ├── LimitChunkCountPlugin.js
	│   │   ├── MergeDuplicateChunksPlugin.js
	│   │   ├── MinChunkSizePlugin.js
	│   │   ├── OccurenceOrderPlugin.js
	│   │   ├── OccurrenceOrderPlugin.js
	│   │   ├── RemoveEmptyChunksPlugin.js
	│   │   ├── RemoveParentModulesPlugin.js
	│   │   └── UglifyJsPlugin.js
	│   ├── removeAndDo.js
	│   ├── web
	│   │   └── WebEnvironmentPlugin.js
	│   ├── webpack.js
	│   ├── webpack.web.js
	│   └── webworker
	│       ├── WebWorkerChunkTemplatePlugin.js
	│       ├── WebWorkerMainTemplatePlugin.js
	│       └── WebWorkerTemplatePlugin.js
	├── package.json
	├── test
	│   ├ ... # тесты 165 папок, 349 файлов
	└── web_modules
	    └── node-libs-browser.js
	# Итого 215 папок, 765 файлов
```
