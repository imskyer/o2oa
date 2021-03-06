package com.x.okr.assemble.control.jaxrs.okrworkreportprocesslog.exception;

import com.x.base.core.project.exception.PromptException;

public class ExceptionReportProcessLogNotExists extends PromptException {

	private static final long serialVersionUID = 1859164370743532895L;

	public ExceptionReportProcessLogNotExists( String id ) {
		super("指定ID的工作汇报处理人信息记录不存在。ID：" + id );
	}
}
