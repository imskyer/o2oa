package com.x.file.assemble.control.jaxrs.file;

import java.util.List;

import com.x.base.core.entity.JpaObject;
import com.x.base.core.project.annotation.FieldDescribe;
import com.x.base.core.project.bean.WrapCopier;
import com.x.base.core.project.bean.WrapCopierFactory;
import com.x.base.core.project.http.ActionResult;
import com.x.base.core.project.http.EffectivePerson;
import com.x.base.core.project.jaxrs.EqualsTerms;
import com.x.file.core.entity.open.File;

class ActionListNext extends BaseAction {
	ActionResult<List<Wo>> execute(EffectivePerson effectivePerson, String id, Integer count) throws Exception {
		ActionResult<List<Wo>> result = new ActionResult<>();
		EqualsTerms equals = new EqualsTerms();
		equals.put("person", effectivePerson.getDistinguishedName());
		result = this.standardListNext(Wo.copier, id, count, JpaObject.sequence_FIELDNAME, equals, null, null, null,
				null, null, null, null, true, DESC);
		return result;
	}

	public static class Wo extends File {

		private static final long serialVersionUID = -125007357898871894L;

		@FieldDescribe("排序号")
		private Long rank;

		static WrapCopier<File, Wo> copier = WrapCopierFactory.wo(File.class, Wo.class,
				JpaObject.singularAttributeField(File.class, true, true), null);

		public Long getRank() {
			return rank;
		}

		public void setRank(Long rank) {
			this.rank = rank;
		}

	}
}
